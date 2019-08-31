import WordStats from "../../../models/wordStats.model";

const findWordStatsByWord = async (word, userId) => {
  try {
    return await WordStats.findOne({ userId, enName: word });
  } catch (error) {
    console.error(
      "[findWordStatsByWord] error while searching word stats document",
      error
    );
  }
};

export default findWordStatsByWord;
