const fs = require("fs");

const readMdFile = async path => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (error, data) => {
      if (error) {
        reject(error);
      }
      resolve(data);
    });
  });
};

export default readMdFile;
