import { Response, NextFunction, Request } from "express";

import logger from "../logger";

const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logger.debug(`------------> New request at ${req.url} `);
  const startTime = Date.now();
  res.on("close", () => {
    const endTime = Date.now();
    logger.debug(`<----------- Completed request in ${endTime - startTime} ms`);
  });
  next();
};

export default requestLogger;
