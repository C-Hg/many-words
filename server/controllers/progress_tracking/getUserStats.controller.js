const getWordStatsByUser = require("./word_stats/getWordStatsByUser.function");
const UserStats = require("../../models/userStats.model");
const assessGlobalProgress = require("./word_stats/assessGlobalProgress.function");

module.exports = async function getUserStats(req, res) {
  let wordStats;
  let userStats;
  let globalProgress = null;
  try {
    wordStats = await getWordStatsByUser(req.user._id);
  } catch (e) {
    console.log("error while fetching word stats by user");
  }
  if (wordStats) {
    globalProgress = assessGlobalProgress(wordStats);
  }
  try {
    userStats = await UserStats.findOne(
      { userId: req.user._id },
      "lessonsStats themesStats"
    );
  } catch (e) {
    console.log("error while fetching user stats by user");
  }
  if (userStats) {
    userStats = userStats.toObject();
    userStats.globalProgress = globalProgress;
    res.send(JSON.stringify(userStats));
    return;
  }
  res.send(JSON.stringify(null));
};
