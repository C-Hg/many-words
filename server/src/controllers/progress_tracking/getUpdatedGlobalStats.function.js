import assessGlobalProgress from "./global_progress/assessGlobalProgress.function";
import getWordsStatsByUser from "./word_stats/getWordsStatsByUser.function";

const getUpdatedGlobalProgress = async user => {
  let wordStats = null;
  let globalProgress = {};

  try {
    wordStats = await getWordsStatsByUser(user._id);
  } catch (error) {
    console.error("error while fetching word stats by user", error);
  }
  if (wordStats) {
    globalProgress = assessGlobalProgress(wordStats, user);
  }

  return globalProgress;
};

export default getUpdatedGlobalProgress;
