import findWordStatsByWord from "./findWordStatsByWord.function";
import createWordStats from "./createWordStats.function";

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
