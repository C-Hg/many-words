import express from "express";
import cors from "cors";
import session from "express-session";
import connectMongoDBSession from "connect-mongodb-session";
import passport from "passport";
import bodyParser from "body-parser";
import helmet from "helmet";
import mongoose from "mongoose";
import secrets from "./config/secrets";
import apiRoutes from "./routes/api.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

/*  -------------   login and session middlewares    -----------*/
const MongoDBStore = connectMongoDBSession(session);
app.set("trust proxy", 1);
app.use(
  session({
    secret: secrets.SESSION_SECRET,
    resave: false, // prevents race condition
    saveUninitialized: false, // creates a session only if user logs in
    cookie: {
      secure: true,
      sameSite: true,
      maxAge: 100 * 24 * 60 * 60 * 1000 // log in every 3 months
    },
    store: new MongoDBStore({
      uri: secrets.MONGO_URI,
      collection: "sessions"
    })
  })
);
app.use(helmet());
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
require("./auth/session/session.middlewares")(); // passport serializer and deserializer

/* ----------------------     Mongoose setup     ------------*/
mongoose.connect(secrets.MONGO_URI, {
  useNewUrlParser: true
});
mongoose.Promise = global.Promise;
// Get the default connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.info("Connected to database");
  // configuring the listening port
  const listener = app.listen(3001, function() {
    console.info(`Many-words is listening on port ${listener.address().port}`);
  });
});

/* --------------------------      routing        ----------------- */
app.use("/api/", apiRoutes);
app.use("/auth/", authRoutes);

/* home routing, allows client-side routing on production
app.use(express.static(path.join(__dirname, "build")));
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
*/
