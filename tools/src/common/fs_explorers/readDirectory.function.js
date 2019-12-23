const fs = require("fs");

exports.readDirectory = async function(directory) {
  return await new Promise((resolve, reject) => {
    fs.readdir(directory, { withFileTypes: true }, function(err, data) {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};
