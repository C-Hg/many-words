import logger from "../logger";
import readFile from "./readFile.function";
import getLessonAndTopic from "../common/getLessonAndTopic.function";
import Word from "../common/models/word.interface";
import getFullWord from "./markdownParser/getFullWord";
import getFilesPaths from "../common/getFilesPaths.function";

// returns an array of word objects from markdown documents
const gatherData = async (directory: string): Promise<Word[]> => {
  const wordsFilesPaths = getFilesPaths(directory);

  if (!wordsFilesPaths) {
    throw new Error(`Cannot get file paths for directory ${directory}`);
  }

  const wordsFilesPromises = wordsFilesPaths.map(
    async path =>
      new Promise<Word>(async (resolve, reject) => {
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
          logger.error(`Error while reading file ${path}`, error);
          reject(error);
        }

        try {
          const word = getFullWord(document, lesson, topic);
          resolve(word);
        } catch (error) {
          logger.error(`Error while extracting data from ${path}`, error);
          reject(error);
        }
      })
  );

  return Promise.all(wordsFilesPromises);
};

export default gatherData;
