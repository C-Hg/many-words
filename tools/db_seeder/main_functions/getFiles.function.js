const path = require("path");
const { readDirectory } = require("./readDirectory.function");

// a recursive file explorer that returns the paths for all word files
const fileExplorer = {
  getFilesPaths: async function(directory) {
    let results = [];
    let files;
    try {
      files = await readDirectory(directory);
    } catch (e) {
      console.log("error while reading directory");
    }
    let pending = files.length;
    if (!pending) {
      return results;
    }
    for (const file of files) {
      let filePath = path.join(directory, file.name);
      if (file.isDirectory()) {
        let nextResults = await fileExplorer.getFilesPaths(filePath);
        results = results.concat(nextResults);
        if (!--pending) return results;
      } else {
        results.push(filePath);
        if (!--pending) return results;
      }
    }
  }
};

module.exports = fileExplorer;
