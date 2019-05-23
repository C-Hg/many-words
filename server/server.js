require("dotenv").config({ path: `${process.cwd()}/.env` });
const express = require("express");

const app = express();
const cors = require("cors");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const passport = require("passport");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const mongoose = require("mongoose");

const secrets = require("./config/secrets");

/*  -------------   login and session middlewares    -----------*/
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
  console.log("Connected to database");
  // configuring the listening port
  const listener = app.listen(3001, function() {
    console.log(`Many-words is listening on port ${listener.address().port}`);
  });
});

/* --------------------------      routing        ----------------- */
const apiRoutes = require("./routes/api.routes");
const authRoutes = require("./routes/auth.routes");

app.use("/api/", apiRoutes);
app.use("/auth/", authRoutes);

/* home routing, allows client-side routing on production
app.use(express.static(path.join(__dirname, "build")));
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
*/
