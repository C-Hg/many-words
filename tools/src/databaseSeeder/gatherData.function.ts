import extractData from "./markdownParser/getFullWord";
import fileExplorer from "../common/getFiles.function";
import readMdFile from "./readMarkdownFile.function";
import getLessonAndTopic from "../common/getLessonAndTopic.function";

// returns an array of word objects from markdown documents
const gatherData = async directory => {
  let wordsFilesPaths;
  try {
    wordsFilesPaths = await fileExplorer.getFilesPaths(directory);
  } catch (error) {
    console.error(`\\033[1;31mError while getting file paths\\033[0;0m`, error);
    return false;
  }

  const wordsFilesPromises = wordsFilesPaths.map(
    path =>
      new Promise(async (resolve, reject) => {
        let lesson;
        let topic;
        try {
          const result = getLessonAndTopic(path);
          ({ lesson, topic } = result);
        } catch (error) {
          reject(error);
        }

        let mdData;
        try {
          mdData = await readMdFile(path);
        } catch (error) {
          console.error(
            `\\033[1;31mError while reading file ${path}\\033[0;0m`,
            error
          );
          reject(error);
        }

        try {
          const word = extractData(mdData, lesson, topic);
          resolve(word);
        } catch (error) {
          console.error(
            `\\033[1;31mError while extracting data from ${path}\\033[0;0m`,
            error
          );
          reject(error);
        }
      })
  );

  const arrayOfWords = await Promise.all(wordsFilesPromises);
  return arrayOfWords;
};

export default gatherData;
