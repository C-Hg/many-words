import Word from "./models/word.model";

const seedWordsInDatabase = async arrayOfWords => {
  try {
    return await Word.insertMany(arrayOfWords);
  } catch (error) {
    console.error(`Error while inserting words to database`, error);
  }
  return null;
};

export default seedWordsInDatabase;
