const path = require("path");
const fs = require("fs");
const { extractData } = require("./md_parser/mdParser");
const fileExplorer = require("./getFiles");
const { readMdFile } = require("./readMdFile");

const curriculumDirectory = path.resolve("../../exercises/FR-EN/");
//returns an array of files
async function gatherData() {
  let wordFilesPaths = await fileExplorer.getFilesPaths(curriculumDirectory);
  for (const path of wordFilesPaths) {
    let mdData = await readMdFile(path);
    let object = extractData(mdData);
  }
}

gatherData();
