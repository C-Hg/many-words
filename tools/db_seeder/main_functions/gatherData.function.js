const { extractData } = require("../md_parser/mdParser");
const fileExplorer = require("./getFiles.function");
const { readMdFile } = require("./readMdFile.function");
const {
  getLessonName
} = require("../md_parser/functions/getLessonName.function");

//returns an array of word objects from markdown documents
exports.gatherData = async function(directory) {
  let wordFilesPaths;
  let arrayOfWords = [];
  try {
    wordFilesPaths = await fileExplorer.getFilesPaths(directory);
  } catch (e) {
    console.log("error while getting file paths");
    return false;
  }

  for (const path of wordFilesPaths) {
    let lessonName = getLessonName(path);
    if (!lessonName) {
      console.log("error while getting lesson name");
      return false;
    }
    let mdData;
    try {
      mdData = await readMdFile(path);
    } catch (e) {
      console.log(`error while reading file ${path}`);
      return false;
    }

    let word = extractData(mdData, lessonName[0]);
    if (!word) {
      console.log(`error while extracting data from ${path}`);
      return false;
    }
    arrayOfWords.push(word);
  }
  return arrayOfWords;
};
