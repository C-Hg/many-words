import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";

import path from "path";

import CONFIG from "./config/config";
import authorizationServer from "./graphql/authorizationServer";
import learnServer from "./graphql/learnServer";
import authentication from "./middlewares/authentication";
import requestLogger from "./middlewares/requestLogger";
import logger from "./utils/logger";

/* --------------------     Authorization app      ------------*/
const authorizationApp = express();
authorizationServer.applyMiddleware({
  app: authorizationApp,
  path: "/",
});

/* ----------------------     Exercises app         ------------*/
// All routes for exercisesServer requires a valid JWT and a user
const learnApp = express();
learnApp.use(authentication);
learnServer.applyMiddleware({ app: learnApp, path: "/" });

/* ----------------------     Main app    ------------*/
const app = express();
const commonMiddlewares = [requestLogger, helmet()];
// TODO: delete?
app.set("trust proxy", 1);
app.use("/", commonMiddlewares);
app.use("/authorization", authorizationApp);
app.use("/learn", learnApp);

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
  // configuring the listening port
  app.listen({ port: CONFIG.serverPort }, () => {
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
