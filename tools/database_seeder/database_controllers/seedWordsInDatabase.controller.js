const Word = require("../models/word.model");

exports.seedWordsInDatabase = async function(arrayOfWords) {
  try {
    return await Word.insertMany(arrayOfWords);
  } catch (e) {
    console.log("Error while inserting words to database");
  }
};
