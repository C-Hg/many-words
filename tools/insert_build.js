const fs = require("fs");

fs.rename("../client/build", "../server/build", err => {
  if (err) throw err;
  console.log("build in place, ready to serve");
});
