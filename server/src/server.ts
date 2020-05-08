import bodyParser from "body-parser";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";

import path from "path";

import secrets from "./config/secrets";
import server from "./graphql";
import logger from "./logger";
import authentication from "./middlewares/authentication";
import requestLogger from "./middlewares/requestLogger";

const app = express();

// TODO: delete?
app.set("trust proxy", 1);

// applies graphql server
app.use(requestLogger);
app.use(helmet());
app.use(authentication);

server.applyMiddleware({ app });

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
    logger.info(
      `🚀🚀  Many-words is ready at http://localhost:${secrets.SERVER_PORT}${server.graphqlPath}`
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
