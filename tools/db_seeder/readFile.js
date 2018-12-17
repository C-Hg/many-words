const fs = require("fs");
const path = require("path");

exports.readMdFile = function(path) {
  fs.readFile(path, "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }
    //let formattedData = extractData.extractData(data);
    console.log(data);
  });
};
