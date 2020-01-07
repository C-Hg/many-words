import Word from "./models/word.model"

const seedWordsInDatabase = async arrayOfWords => {
  try {
    return await Word.insertMany(arrayOfWords);
  } catch (error) {
    console.error(
      `\\033[1;31mError while inserting words to database\\033[0;0m`,
      error
    );
  }
  return null
};

export default seedWordsInDatabase;
