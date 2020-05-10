import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";

import path from "path";

import secrets from "./config/secrets";
import authorizationServer from "./graphql/authorizationServer";
import exercisesServer from "./graphql/exercisesServer";
import logger from "./logger";
import authentication from "./middlewares/authentication";
import requestLogger from "./middlewares/requestLogger";

/* --------------------     Authorization app      ------------*/
const authorizationApp = express();
authorizationServer.applyMiddleware({
  app: authorizationApp,
  path: "/",
});

/* ----------------------     Exercises app         ------------*/
// All routes for exercisesServer requires a valid JWT and a user
const exercisesApp = express();
exercisesApp.use(authentication);
exercisesServer.applyMiddleware({ app: exercisesApp, path: "/" });

/* ----------------------     Main app    ------------*/
const app = express();
const commonMiddlewares = [requestLogger, helmet()];
// TODO: delete?
app.set("trust proxy", 1);
app.use("/", commonMiddlewares);
app.use("/authorization", authorizationApp);
app.use("/exercises", exercisesApp);

/* ----------------------     Mongoose setup     ------------*/
mongoose.connect(secrets.MONGO_URI, {
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
  app.listen({ port: secrets.SERVER_PORT }, () => {
    logger.info("-------     🚀  Many-words server is live 🚀     -------");
    logger.info(
      `🔑 authorization: http://localhost:${secrets.SERVER_PORT}/authorization`
    );
    logger.info(
      `🎯 exercises: http://localhost:${secrets.SERVER_PORT}/exercises`
    );
  });
});

/* React bundle is served by the node server but allows client-side routing on production */
if (secrets.NODE_ENV !== "development") {
  app.use(express.static(path.join(__dirname, "build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}
