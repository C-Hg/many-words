import express from "express";
import cors from "cors";
import session from "express-session";
import connectMongoDBSession from "connect-mongodb-session";
import passport from "passport";
import bodyParser from "body-parser";
import helmet from "helmet";
import mongoose from "mongoose";

import path from "path";

import secrets from "./config/secrets";
import apiRoutes from "./routes/api.routes";
import authRoutes from "./routes/auth.routes";
import sessionMiddlewares from "./middlewares/session.middlewares";

const app = express();

/*  -------------   login and session middlewares    -----------*/
const MongoDBStore = connectMongoDBSession(session);
app.set("trust proxy", 1);
app.use(
  session({
    secret: secrets.SESSION_SECRET,
    name: "sessionId",
    resave: false, // prevents race condition
    saveUninitialized: false, // creates a session only if user logs in
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: true,
      maxAge: 100 * 24 * 60 * 60 * 1000, // log in every 3 months
    },
    store: new MongoDBStore({
      uri: secrets.MONGO_URI,
      collection: "sessions",
    }),
  })
);
app.use(helmet());
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
sessionMiddlewares();

/* ----------------------     Mongoose setup     ------------*/
mongoose.connect(secrets.MONGO_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;
// Get the default connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.info("Connected to database");
  // configuring the listening port
  const listener = app.listen(3001, () => {
    console.info(`Many-words is listening on port ${listener.address().port}`);
  });
});

/* --------------------------      routing        ----------------- */
app.use("/api/", apiRoutes);
app.use("/auth/", authRoutes);

/* React bundle is served by the node server but allows client-side routing on production */
if (secrets.NODE_ENV !== "development") {
  app.use(express.static(path.join(__dirname, "build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}
