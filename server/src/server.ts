import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";

import fs from "fs";
import https from "https";
import path from "path";

import CONFIG, { ENVIRONMENTS } from "./config/config";
import authorizationServer from "./graphql/authorizationServer";
import learnServer from "./graphql/learnServer";
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

/* ----------------------     Main app    ------------*/
const app = express();
let httpsApp: https.Server;
const commonMiddlewares = [requestLogger, helmet()];
if (
  CONFIG.env === ENVIRONMENTS.production ||
  CONFIG.env === ENVIRONMENTS.staging
) {
  const sslOptions = {
    key: fs.readFileSync(`${CONFIG.sslPath}/privkey.pem`, "utf8"),
    cert: fs.readFileSync(`${CONFIG.sslPath}/cert.pem`, "utf8"),
    ca: fs.readFileSync(`${CONFIG.sslPath}/chain.pem`, "utf8"),
  };
  httpsApp = https.createServer(sslOptions, app);
  app.set("trust proxy", 1);
}
app.use("/", commonMiddlewares);

// The authorization API does not require authentication
app.use("/authorization", (req, res, next) => {
  authorizationServer.applyMiddleware({
    app,
    path: "/authorization",
  });
  next();
});
// All routes regarding exercises require a valid JWT and a user
app.use("/learn", authentication, (req, res, next) => {
  learnServer.applyMiddleware({ app, path: "/learn" });
  next();
});

/* ----------------------     Mongoose setup     ------------*/
mongoose.connect(CONFIG.mongoUri, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;
// Get the default connection
const db = mongoose.connection;

db.on("error", (error) => logger.error(`MongoDB connection error - ${error}`));
db.once("open", () => {
  logger.info("Connected to database");
  const server = httpsApp || app;
  // configuring the listening port
  server.listen({ port: CONFIG.serverPort }, () => {
    logger.info("-------     🚀  Many-words server is live 🚀     -------");
    logger.info(
      `🔑 authorization: http://localhost:${CONFIG.serverPort}/authorization`
    );
    logger.info(`🎯 learn: http://localhost:${CONFIG.serverPort}/learn`);
  });
});

/* React bundle is served by the node server but allows client-side routing on production */
if (CONFIG.env !== "development") {
  app.use(express.static(path.join(__dirname, "build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}
