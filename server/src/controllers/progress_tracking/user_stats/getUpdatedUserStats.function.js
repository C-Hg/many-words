import getUpdatedLessonsStats from "../getUpdatedLessonsStats.function";
import getUpdatedThemesStats from "../getUpdatedThemesStats.function";
import getUpdatedGlobalProgress from "../getUpdatedGlobalStats.function";

const getUpdatedUserStats = async (lessonsToUpdate, user) => {
  const updatedLessonsStats = await getUpdatedLessonsStats(
    lessonsToUpdate,
    user
  );
  const updatedThemesStats = getUpdatedThemesStats(updatedLessonsStats);
  const updatedGlobalProgress = await getUpdatedGlobalProgress(user);

  const updatedUserStats = {
    ...user.stats,
    lessons: updatedLessonsStats,
    themes: updatedThemesStats,
    globalProgress: updatedGlobalProgress
  };

  return updatedUserStats;
};

export default getUpdatedUserStats;
