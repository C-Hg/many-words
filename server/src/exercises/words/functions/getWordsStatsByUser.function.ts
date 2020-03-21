import WordStats from "../models/words/wordStats.model";

const getWordsStatsByUser = async userId => {
  let wordStats;
  try {
    wordStats = await WordStats.find({
      userId,
    });
  } catch (error) {
    console.error(
      "[getWordsStatsByUser] error while fetching word stats count",
      error
    );
  }
  return wordStats;
};

export default getWordsStatsByUser;
