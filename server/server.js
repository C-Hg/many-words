const express = require("express");
const app = express();

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

//home routing
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/client/public/index.html");
});
