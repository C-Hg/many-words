import WordStatsModel from "../models/words/wordStats.model";

const findWordStatsByWord = async (word, userId) => {
  try {
    return await WordStatsModel.findOne({ userId, enName: word });
  } catch (error) {
    console.error(
      "[findWordStatsByWord] error while searching word stats document",
      error
    );
  }
};

export default findWordStatsByWord;
