import getUpdatedLessonsStats from "../lessons/getUpdatedLessonsStats.function";
import getUpdatedThemesStats from "../themes/getUpdatedThemesStats.function";
import getUpdatedGlobalProgress from "../global/getUpdatedGlobalProgress.function";

const getUpdatedUserStats = async (lessonsToUpdate, user) => {
  const updatedLessonsStats = await getUpdatedLessonsStats(
    lessonsToUpdate,
    user
  );
  const updatedThemesStats = getUpdatedThemesStats(updatedLessonsStats);
  const updatedGlobalProgress = await getUpdatedGlobalProgress(
    user,
    updatedLessonsStats,
    updatedThemesStats
  );

  const updatedUserStats = {
    ...user.stats,
    lessons: updatedLessonsStats,
    themes: updatedThemesStats,
    globalProgress: updatedGlobalProgress
  };

  return updatedUserStats;
};

export default getUpdatedUserStats;
