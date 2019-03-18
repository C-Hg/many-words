const getWordStatsByUser = require("./word_stats/getWordStatsByUser.function");
const assessGlobalProgress = require("./word_stats/assessGlobalProgress.function");

module.exports = async function getUserStats(user) {
  let wordStats;
  let globalProgress = null;

  try {
    wordStats = await getWordStatsByUser(user._id);
  } catch (e) {
    console.log("error while fetching word stats by user");
  }
  if (wordStats) {
    globalProgress = assessGlobalProgress(wordStats);
  }
  console.log(globalProgress);
  user.globalProgress = globalProgress;

  return user;
};
