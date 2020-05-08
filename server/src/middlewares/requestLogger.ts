import { Response, NextFunction, Request } from "express";

import logger from "../logger";

const requestLogger = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  logger.debug(` --------------------------> New request ${req.url} `);
  const startTime = Date.now();
  await next();
  const endTime = Date.now();
  logger.debug(`Completed request in ${endTime - startTime} ms`);
};

export default requestLogger;
