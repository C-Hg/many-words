const path = require("path");
const fs = require("fs");

exports.readDirectory = async function(directory) {
  let result = await new Promise((resolve, reject) => {
    fs.readdir(directory, { withFileTypes: true }, function(err, data) {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
  return result;
};
