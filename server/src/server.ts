import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";

import path from "path";

import secrets from "./config/secrets";
import server from "./graphql";
import logger from "./logger";
import authentication from "./middlewares/authentication";

const app = express();
// applies graphql server

// TODO: delete?
app.set("trust proxy", 1);
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
  app.listen({ port: 4000 }, () => {
    logger.info(
      `🚀 Many-words is ready at http://localhost:4000${server.graphqlPath}`
    );
  });
});

/* --------------------------      routing        ----------------- */
// app.use("/api/", apiRoutes);
// app.use("/auth/", authRoutes);

/* React bundle is served by the node server but allows client-side routing on production */
if (secrets.NODE_ENV !== "development") {
  app.use(express.static(path.join(__dirname, "build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}
