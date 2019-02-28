const fs = require("fs");

fs.copyFile(
  "../../../config/server/secrets.js",
  "../server/config/secrets.js",
  err => {
    if (err) throw err;
    console.log("server secrets updated");
  }
);

fs.copyFile(
  "../../../config/client/secrets.js",
  "../client/src/config/secrets.js",
  err => {
    if (err) throw err;
    console.log("client secrets updated, ready to build!");
  }
);
