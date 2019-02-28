const fs = require("fs");

fs.copyFile("../client/build", "../server/", err => {
  if (err) throw err;
  console.log("build in place, ready to serve");
});
