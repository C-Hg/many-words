import assessGlobalProgress from "./assessGlobalProgress.function";
import getWordsStatsByUser from "../words/getWordsStatsByUser.function";

const getUpdatedGlobalProgress = async (
  user,
  updatedLessonsStats,
  updatedThemesStats
) => {
  let wordStats = null;
  let globalProgress = {};

  try {
    wordStats = await getWordsStatsByUser(user._id);
  } catch (error) {
    console.error("error while fetching word stats by user", error);
  }
  if (wordStats) {
    globalProgress = assessGlobalProgress(
      wordStats,
      updatedLessonsStats,
      updatedThemesStats
    );
  }

  return globalProgress;
};

export default getUpdatedGlobalProgress;
