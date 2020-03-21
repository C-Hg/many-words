import logger from "../logger";
import Word from "../common/models/word.model";
import WordInterface from "../common/models/word.interface";

const seedWordsInDatabase = async (
  arrayOfWords: WordInterface[]
): Promise<WordInterface[]> => {
  try {
    return await Word.insertMany(arrayOfWords);
  } catch (error) {
    logger.error(`Error while inserting words to database`, error);
  }
  return null;
};

export default seedWordsInDatabase;