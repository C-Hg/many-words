import express from "express";
import path from "path";
import session from "express-session";
import fs from "fs";
import https from "https";
import connectMongoDBSession from "connect-mongodb-session";
import passport from "passport";
import bodyParser from "body-parser";
import helmet from "helmet";
import mongoose from "mongoose";
import secrets from "./config/secrets";
import apiRoutes from "./routes/api.routes";
import authRoutes from "./routes/auth.routes";
import sessionMiddlewares from "./auth/session/session.middlewares";

// redirecting http requests
const httpApp = express();

httpApp.get("/*", (req, res) => {
  console.info("Redirect user to https")
  return res.redirect(301, 'https://manywords.org/');
});
httpApp.listen(80, () => {
  console.info(`Http server ready to redirect from port 80`);
});

// https server
// TODO: path as .env variables
const sslOptions = {
  key: fs.readFileSync('/server/letsencrypt/live/manywords.org-0002/privkey.pem','utf8'),
  cert: fs.readFileSync('/server/letsencrypt/live/manywords.org-0002/cert.pem','utf8'),
  ca: fs.readFileSync('/server/letsencrypt/live/manywords.org-002/chain.pem','utf8'),
};

const app = express();
const httpsApp = https.createServer(sslOptions, app);

/*  -------------   login and session middlewares    -----------*/
const MongoDBStore = connectMongoDBSession(session);
//app.set("trust proxy", 1); needed in development only?
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
app.use(bodyParser.urlencoded({ extended: false }));
sessionMiddlewares();

/* ----------------------     Mongoose setup     ------------*/
mongoose.connect(secrets.MONGO_URI, {
  useNewUrlParser: true,
  useFindAndModify: false
});
mongoose.Promise = global.Promise;
// Get the default connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.info("Connected to database");
  // configuring the listening port
  const listener = httpsApp.listen(3001, () => {
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
