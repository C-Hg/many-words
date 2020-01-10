import readFile from "./readFile.function";
import getLessonAndTopic from "../common/getLessonAndTopic.function";
import Word from "./models/word.interface";
import getFullWord from "./markdownParser/getFullWord";
import getFilesPaths from "../common/getFilesPaths.function";

// returns an array of word objects from markdown documents
const gatherData = async (directory: string): Promise<Word> => {
  let wordsFilesPaths;
  try {
    wordsFilesPaths = await getFilesPaths(directory);
  } catch (error) {
    console.error(`Cannot get file paths for directory ${directory}`, error);
    return null;
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

        let document;
        try {
          document = await readFile(path);
        } catch (error) {
          console.error(`Error while reading file ${path}`, error);
          reject(error);
        }

        try {
          const word = getFullWord(document, lesson, topic);
          resolve(word);
        } catch (error) {
          console.error(`Error while extracting data from ${path}`, error);
          reject(error);
        }
      })
  );

  const arrayOfWords = await Promise.all(wordsFilesPromises);
  return arrayOfWords;
};

export default gatherData;
