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
    console.error(
      "\033[1;31m" + "Error while getting file paths" + "\033[0;0m"
    );
    return false;
  }

  for (const path of wordFilesPaths) {
    let lessonName = getLessonName(path);
    if (!lessonName) {
      console.log(
        "\033[1;31m" + "Error while getting lesson name" + "\033[0;0m"
      );
      return false;
    }
    let mdData;
    try {
      mdData = await readMdFile(path);
    } catch (e) {
      console.error(
        "\033[1;31m" + `Error while reading file ${path}` + "\033[0;0m"
      );
      return false;
    }

    let word = extractData(mdData, lessonName[0]);
    if (!word) {
      console.error(
        "\033[1;31m" + `Error while extracting data from ${path}` + "\033[0;0m"
      );
      return false;
    }
    arrayOfWords.push(word);
  }
  return arrayOfWords;
};
