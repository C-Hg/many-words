import { Response, NextFunction, Request } from "express";

import logger from "../logger";
import userService from "../user/user.service";

const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // TODO: fetch real user for production
  // const user = null;
  const user = await userService.getUserById("5d66dc6a8946c00184ab1102");
  if (!user) {
    // TODO: move up when verifying token
    logger.error(`[authentication] user does not exist`);
    res.status(401).json({ error: "Unauthenticated" }).end();
    return;
  }

  // req.ctx = { user: user.toObject() };
  // logger.debug(`[authentication] authenticated user ${user.id}`);

  next();
};

export default authentication;
