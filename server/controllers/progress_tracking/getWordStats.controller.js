const findWordStatsByWord = require("./word_stats/findWordStatsByWord.function");
const createWordStats = require("./word_stats/createWordStats.function");

module.exports = async function getWordStats(word, user) {
  let wordStats;
  try {
    wordStats = await findWordStatsByWord(word, user);
  } catch (e) {
    console.log("error while fetching word stats");
  }
  if (wordStats) {
    return wordStats;
  }

  try {
    wordStats = await createWordStats(word, user);
  } catch (e) {
    console.log("error while creating word stats");
  }
  return wordStats;
};
