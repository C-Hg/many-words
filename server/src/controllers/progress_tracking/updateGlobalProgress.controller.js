import getWordStatsByUser from "./word_stats/getWordStatsByUser.function";
import assessGlobalProgress from "./global_progress/assessGlobalProgress.function";

const getUserStats = async user => {
  let wordStats = null;
  let globalProgress = {};

  try {
    wordStats = await getWordStatsByUser(user._id);
  } catch (e) {
    console.log("error while fetching word stats by user");
  }
  if (wordStats) {
    globalProgress = assessGlobalProgress(wordStats, user);
  }

  user.stats.globalProgress = globalProgress;
  return user;
};

export default getUserStats;
