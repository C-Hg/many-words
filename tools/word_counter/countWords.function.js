const Word = require("../common/models/word.model");

module.exports = async function countWords(lesson) {
  try {
    return await Word.countDocuments({
      lesson: lesson
    });
  } catch (e) {
    console.log("error while counting lesson words");
  }
};
