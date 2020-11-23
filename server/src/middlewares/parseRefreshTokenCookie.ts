/* eslint-disable @typescript-eslint/unbound-method */
import { Response, NextFunction, Request } from "express";

import verifyToken from "../authorization/helpers/jwt/verifyToken";
import { Cookies } from "../authorization/helpers/setCookies";
import { TokenPayload } from "../authorization/interfaces/tokenPayload.interface";
import error401 from "../utils/errors/error401";
import logger from "../utils/logger";

interface SignedCookies {
  [Cookies.refreshToken]: string;
}

function hasRefreshTokenCookies(
  signedCookies: Record<string, unknown> | SignedCookies
): signedCookies is SignedCookies {
  return Object.prototype.hasOwnProperty.call(
    signedCookies,
    Cookies.refreshToken
  );
}

const parseRefreshTokenCookie = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let verifiedToken: TokenPayload;
  let refreshToken;
  // extract the jwt from cookie or authorization header
  // const hasCookies = Object.keys(req.signedCookies).length > 0;
  if (hasRefreshTokenCookies(req.signedCookies)) {
    refreshToken = req.signedCookies[Cookies.refreshToken];
  }

  if (!refreshToken) {
    return next();
  }

  // verify the jwt
  try {
    verifiedToken = await verifyToken(refreshToken);
  } catch (error) {
    // allow expired token in dev mode only, with decodedToken
    logger.error(`[parseRefreshTokenCookie] 401 - ${error}`);
    return error401(res);
  }

  // adds the parsed refreshToken to the context
  req.refreshToken = verifiedToken;
  logger.debug(
    `[parseRefreshTokenCookie] successfully parsed refresh token for user ${verifiedToken.sub}`
  );
  next();
};

export default parseRefreshTokenCookie;
