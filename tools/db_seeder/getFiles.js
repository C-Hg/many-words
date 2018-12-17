const path = require("path");
const fs = require("fs");
const { readDirectory } = require("./readDirectory");
const { readMdFile } = require("./readFile");

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

// a recursive file explorer that returns the paths for all word files
const fileFunction = {
  getFiles: async function(directory) {
    let results = [];
    let files = await readDirectory(directory);
    let pending = files.length;
    if (!pending) {
      return results;
    }
    for (const file of files) {
      let filePath = path.join(directory, file.name);
      if (file.isDirectory()) {
        let nextResults = await fileFunction.getFiles(filePath);
        results = results.concat(nextResults);
        if (!--pending) return results;
      } else {
        results.push(filePath);
        if (!--pending) return results;
      }
    }
  }
};

module.exports = fileFunction;
