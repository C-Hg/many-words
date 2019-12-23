const Word = require("../../common/models/word.model");

exports.seedWordsInDatabase = async function(arrayOfWords) {
  try {
    return await Word.insertMany(arrayOfWords);
  } catch (e) {
    console.log(
      "\033[1;31m" + "Error while inserting words to database" + "\033[0;0m"
    );
  }
};
