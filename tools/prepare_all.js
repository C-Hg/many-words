const fs = require("fs");

// seeds the dabase with the words
fs.copyFile(
  "../../../config/database_seeder/database_seeder.js",
  "./database_seeder.js",
  err => {
    if (err) throw err;
    console.log("server secrets updated");
  }
);

// update server secrets for production (from production environment)
fs.copyFile(
  "../../../config/server/secrets.js",
  "../server/config/secrets.js",
  err => {
    if (err) throw err;
    console.log("server secrets updated");
  }
);

// update server secrets for production (from production environment)
fs.copyFile(
  "../../../config/client/secrets.js",
  "../client/src/config/secrets.js",
  err => {
    if (err) throw err;
    console.log("client secrets updated, ready to build!");
  }
);

// TODO: update this configuration, replace it with docker-compose.production
