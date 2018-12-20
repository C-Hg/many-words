const path = require("path");
const fs = require("fs");
const { extractData } = require("./md_parser/mdParser");
const fileExplorer = require("./getFiles");
const { readMdFile } = require("./readMdFile");

const curriculumDirectory = path.resolve("../../exercises/FR-EN/");
//returns an array of files
async function gatherData() {
  let wordFilesPaths;
  try {
    wordFilesPaths = await fileExplorer.getFilesPaths(curriculumDirectory);
  } catch (e) {
    console.log("error while getting file paths");
  }

  for (const path of wordFilesPaths) {
    let lessonName = getLessonName(path);
    if (!lessonName) {
      console.log("error while getting lesson name");
      return;
    }
    let mdData;
    try {
      mdData = await readMdFile(path);
    } catch (e) {
      console.log(`error while reading file ${path}`);
    }

    let word = extractData(mdData, lessonName[0]);
    if (!word) {
      console.log(`error while extracting data from ${path}`);
      return;
    }
    console.log(word);
    return word;
  }
}

gatherData();
