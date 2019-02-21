require("dotenv").config({ path: process.cwd() + "/.env" });
const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const passport = require("passport");
const bodyParser = require("body-parser");
const helmet = require("helmet");

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
      maxAge: 100 * 24 * 60 * 60 * 1000 //log in every 3 months
    },
    store: new MongoDBStore({
      uri: process.env.MONGO_URI || "mongodb://localhost/many-words",
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
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost/many-words", {
  useNewUrlParser: true
});
mongoose.Promise = global.Promise;
//Get the default connection
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to database");
  //configuring the listening port
  const listener = app.listen(process.env.PORT || 3001, function() {
    console.log("Many-words is listening on port " + listener.address().port);
  });
});

/* --------------------------      routing        ----------------- */
const apiRoutes = require("./routes/api.routes");
app.use("/api/", apiRoutes);

//auth routing
const authRoutes = require("./routes/auth.routes");
app.use("/auth/", authRoutes);

app.use(express.static(path.join(__dirname, "build")));

/*home routing
To be resolved before deployment, depending on the strategy chosen

//if (process.env.ENV === "DEVELOPMENT") {
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
  //res.sendFile(__dirname + "/client/public/index.html");
});

} else if (process.env.ENV === "PRODUCTION") {
  // allows client-side routing
  app.use(express.static(path.join(__dirname, "build")));
  app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

*/
