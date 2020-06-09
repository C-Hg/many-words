/* eslint-disable @typescript-eslint/unbound-method */
import { Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";

import verifyToken from "../authorization/helpers/jwt/verifyToken";
import CONFIG from "../config/config";
import userService from "../user/user.service";
import error401 from "../utils/errors/error401";
import logger from "../utils/logger";

const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // TODO: parse cookies and get token
  let verifiedToken;

  // extract the jwt from cookie or authorization header
  const token = req.headers.authorization;
  if (!token) {
    if (CONFIG.env !== "development") {
      logger.error(`[authentication] 401 - no token provided`);
      return error401(res);
    } else {
      // to allow graphql code generator
      return next();
    }
  }

  // verify the jwt
  try {
    verifiedToken = await verifyToken(token);
  } catch (error) {
    // allow expired token in dev mode only, with decodedToken
    if (CONFIG.env !== "development") {
      logger.error(`[authentication] 401 - ${error}`);
      return error401(res);
    }
    verifiedToken = jwt.decode(token);
  }
  if (!verifiedToken) {
    return error401(res);
  }

  // fetch the user
  const user = await userService.getUserById(verifiedToken.sub);
  if (!user) {
    logger.error(`[authentication] no user found with id ${verifiedToken.sub}`);
    return error401(res);
  }
  req.ctx = { user: user.toObject() };
  logger.debug(`[authentication] authenticated user ${user.id}`);

  next();
};

export default authentication;
