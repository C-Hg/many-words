const Word = require("../common/models/word.model");

const countWords = async lesson => {
  let wordsCount;
  try {
    wordsCount = await Word.countDocuments({
      lesson,
    });
  } catch (error) {
    console.error(`[countWords] - ${error}`);
  }
  return wordsCount;
};

export default countWords;
