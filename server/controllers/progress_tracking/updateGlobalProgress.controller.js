const getWordStatsByUser = require("./word_stats/getWordStatsByUser.function");
const assessGlobalProgress = require("./global_progress/assessGlobalProgress.function");

module.exports = async function getUserStats(user) {
  let wordStats = null;
  let globalProgress = {};

  try {
    wordStats = await getWordStatsByUser(user._id);
  } catch (e) {
    console.log("error while fetching word stats by user");
  }
  if (wordStats) {
    globalProgress = assessGlobalProgress(wordStats);
  }

  user.globalProgress = globalProgress;

  return user;
};
