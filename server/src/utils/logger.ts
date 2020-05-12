import winston from "winston";

const myFormat = winston.format.printf(({ level, message }) => {
  return `${level} ${message}`;
});

const logger = winston.createLogger({
  level: "debug",
  format: winston.format.combine(winston.format.colorize(), myFormat),
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    // new winston.transports.File({ filename: "error.log", level: "error" }),
    // new winston.transports.File({ filename: "combined.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.padLevels(),
        winston.format.prettyPrint(),
        myFormat
      ),
    })
  );
}

export default logger;
