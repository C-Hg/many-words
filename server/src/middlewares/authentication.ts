/* eslint-disable @typescript-eslint/unbound-method */
import { Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";

import verifyToken from "../authorization/helpers/jwt/verifyToken";
import { Cookies } from "../authorization/helpers/setCookies";
import CONFIG from "../config/config";
import userService from "../user/user.service";
import logger from "../utils/logger";

interface SignedCookies {
  [Cookies.accessToken]: string;
}

function hasAccessTokenCookies(
  signedCookies: Record<string, unknown> | SignedCookies
): signedCookies is SignedCookies {
  return Object.prototype.hasOwnProperty.call(
    signedCookies,
    Cookies.accessToken
  );
}

const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let verifiedToken;
  let accessToken;
  // extract the jwt from cookie or authorization header
  // const hasCookies = Object.keys(req.signedCookies).length > 0;
  if (hasAccessTokenCookies(req.signedCookies)) {
    accessToken = req.signedCookies[Cookies.accessToken];
  } else if (req.headers.authorization) {
    accessToken = req.headers.authorization;
  }

  if (!accessToken) {
    logger.debug(`[authentication] - no token provided`);
    return next();
  }

  // verify the jwt
  try {
    verifiedToken = await verifyToken(accessToken);
  } catch (error) {
    // allow expired token in dev mode only, with decodedToken
    if (CONFIG.env === "development") {
      verifiedToken = jwt.decode(accessToken);
    }
  }
  if (!verifiedToken) {
    return next();
  }

  // fetch the user
  const user = await userService.getUserById(verifiedToken.sub);
  if (!user) {
    logger.error(`[authentication] no user found with id ${verifiedToken.sub}`);
    return next();
  }
  req.ctx = { user };
  logger.debug(`[authentication] authenticated user ${user.id}`);

  next();
};

export default authentication;
