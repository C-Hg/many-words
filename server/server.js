const express = require("express");
const app = express();
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const bodyParser = require("body-parser");
const cors = require("cors");
const secrets = require("./config/secrets");

app.use(session({ secret: secrets.SESSION_SECRET }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

//Auth middlewares
passport.use(
  new GoogleStrategy(
    {
      clientID: secrets.GOOGLE_CLIENT_ID,
      clientSecret: secrets.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ googleSub: profile.id }, function(err, user) {
        console.log(accessToken, profile);
        return cb(err, user);
      });
    }
  )
);

//Mongoose setup
const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGO_URI || "mongodb://localhost/many-words",
  { useNewUrlParser: true }
);
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

//auth routing
const authRoutes = require("./routes/auth.routes");

//home routing
if (process.env.ENV === "DEVELOPMENT") {
  app.use("/auth/", authRoutes);
  app.get("/", function(req, res) {
    res.sendFile(__dirname + "/client/public/index.html");
  });
} else if (process.env.ENV === "PRODUCTION") {
  // allows client-side routing
  app.use(express.static(path.join(__dirname, "build")));
  app.use("/auth/", authRoutes);
  app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

//api routing
const apiRoutes = require("./routes/api.routes");
app.use("/api/", apiRoutes);
