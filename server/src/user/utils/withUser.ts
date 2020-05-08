import { Request } from "express";

import logger from "../../logger";
import error500 from "../../utils/error500";

const withUser = (req: Request): void => {
  if (!req?.ctx?.user) {
    logger.error("[withUser] user is undefined");
    throw new Error("Unauthorized request, please login");
  }
};

export default withUser;
