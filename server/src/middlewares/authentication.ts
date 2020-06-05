import { Response, NextFunction, Request } from "express";

import verifyToken from "../authorization/helpers/jwt/verifyToken";
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

  const token = req.headers["authorization"];
  if (!token) {
    logger.error(`[authentication] 401 - no token provided`);
    return error401(res);
  }
  try {
    verifiedToken = await verifyToken(token);
  } catch (error) {
    // TODO: allow expired token in dev mode only, with decodedToken
    return;
  }

  const user = await userService.getUserById(verifiedToken.sub);
  if (!user) {
    logger.error(`[authentication] user does not exist`);
    return error401(res);
  }

  req.ctx = { user: user.toObject() };
  logger.debug(`[authentication] authenticated user ${user.id}`);

  next();
};

export default authentication;
