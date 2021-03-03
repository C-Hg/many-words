import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import mongoose from "mongoose";

import fs from "fs";
import https from "https";
import path from "path";

import CONFIG from "./config/config";
import apolloServer from "./graphql/apolloServer";
import authentication from "./middlewares/authentication";
import requestLogger from "./middlewares/requestLogger";
import logger from "./utils/logger";

/* --------       redirecting http requests       ------------ */
const httpApp = express();

httpApp.get("/*", (req, res) => {
  logger.info("Redirect user to https");
  return res.redirect(301, "https://manywords.org/");
});
httpApp.listen(80, () => {
  logger.info(`Http server ready to redirect from port 80`);
});

/* ----------------------     Main app       ------------*/
const app = express();
const sslOptions = {
  key: fs.readFileSync(`${CONFIG.sslPath}/privkey.pem`, "utf8"),
  cert: fs.readFileSync(`${CONFIG.sslPath}/cert.pem`, "utf8"),
  ca: fs.readFileSync(`${CONFIG.sslPath}/chain.pem`, "utf8"),
};
const httpsApp = https.createServer(sslOptions, app);

/* --------------------      Middlewares        -----------*/
const serverMiddlewares = [
  requestLogger,
  cors({ credentials: true, origin: "https://localhost:3000" }), // TODO: configure env variables for production
  cookieParser(CONFIG.cookieParserKey),
  authentication,
];
const middlewares = [
  helmet({
    contentSecurityPolicy:
      process.env.NODE_ENV === "production" ? undefined : false,
  }),
];
app.use("/", middlewares);

/* ------------------     Apollo server setup    -----------*/
app.use(
  "/graphql",
  serverMiddlewares,
  (req: Request, res: Response, next: NextFunction) => {
    apolloServer.applyMiddleware({
      app,
      path: "/graphql",
      cors: false,
    });
    next();
  }
);

/* ----------------------     Mongoose setup     ------------*/
mongoose.connect(CONFIG.mongoUri, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on("error", (error) => logger.error(`MongoDB connection error - ${error}`));
db.once("open", () => {
  logger.info("Connected to database");
  // configuring the listening port
  httpsApp.listen({ port: CONFIG.serverPort }, () => {
    logger.info(
      `🚀  Server is live at https://localhost:${CONFIG.serverPort}/graphql  🚀`
    );
  });
});

/* React bundle is served by the node server but allows client-side routing on production */
if (CONFIG.env !== "development") {
  app.use(express.static(path.join(__dirname, "build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}
