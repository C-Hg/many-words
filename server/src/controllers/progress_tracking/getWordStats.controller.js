import findWordStatsByWord from "./word_stats/findWordStatsByWord.function";
import createWordStats from "./word_stats/createWordStats.function";

const getWordStats = async (word, user) => {
  let wordStats;
  try {
    wordStats = await findWordStatsByWord(word, user);
  } catch (error) {
    console.error("error while fetching word stats", error);
  }
  if (wordStats) {
    return wordStats.toObject();
  }

  try {
    wordStats = await createWordStats(word, user);
  } catch (error) {
    console.error("error while creating word stats", error);
  }
  return wordStats;
};

export default getWordStats;
