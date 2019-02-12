const { extractData } = require("../markdown_parser/markdownParser");
const fileExplorer = require("../../common/fs_explorers/getFiles.function");
const { readMdFile } = require("./readMarkdownFile.function");
const getLessonAndTheme = require("../../common/getLessonAndTheme.function");

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
    let lessonAndTheme = getLessonAndTheme(path);
    if (!lessonAndTheme[0] || !lessonAndTheme[1]) {
      console.log(
        "\033[1;31m" + "Error while getting lesson or theme name" + "\033[0;0m"
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

    let word = extractData(mdData, lessonAndTheme);
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
