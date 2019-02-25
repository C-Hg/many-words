const getWordStatsByUser = require("./word_stats/getWordStatsByUser.function");
const assessGlobalProgress = require("./word_stats/assessGlobalProgress.function");

module.exports = async function getUserStats(req, res) {
  let wordStats;
  let user = req.user;
  let globalProgress = null;

  try {
    wordStats = await getWordStatsByUser(user._id);
  } catch (e) {
    console.log("error while fetching word stats by user");
  }
  if (wordStats) {
    globalProgress = assessGlobalProgress(wordStats);
  }

  res.send(
    JSON.stringify({
      lessonsStats: user.lessonsStats,
      themesStats: user.themesStats,
      globalProgress: globalProgress
    })
  );
  return;
};
