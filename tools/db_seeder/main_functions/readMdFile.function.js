const fs = require("fs");

exports.readMdFile = async function(path) {
  return await new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", function(err, data) {
      if (err) {
        reject(err);
      }
      //let formattedData = extractData.extractData(data);
      resolve(data);
    });
  });
};
