import Word from "./models/word.model";
import WordInterface from "./models/word.interface";

const seedWordsInDatabase = async (
  arrayOfWords: WordInterface[]
): Promise<WordInterface[]> => {
  try {
    return await Word.insertMany(arrayOfWords);
  } catch (error) {
    console.error(`Error while inserting words to database`, error);
  }
  return null;
};

export default seedWordsInDatabase;
