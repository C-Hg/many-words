import updateWordStats from "./word_stats/updateWordStats.function";
import getUpdatedWordStats from "./word_stats/getUpdatedWordStats.function";
import getOrCreateWordStats from "./word_stats/getOrCreateWordStats.function";
import getLessonsToUpdate from "./lesson_stats/getLessonsToUpdate.function";

const upsertWordStats = async (exerciseResults, userId) => {
  // data received in an array of arrays :
  // [ [enName of the word, source_language, form name, answered correctly?], [...], ... ]

  const allWordsStats = await getOrCreateWordStats(exerciseResults, userId);
  const updatedWordStats = await getUpdatedWordStats(
    allWordsStats,
    exerciseResults
  );
  updateWordStats(updatedWordStats, userId);

  const lessonsToUpdate = getLessonsToUpdate(allWordsStats);
  return lessonsToUpdate;
};

// TODO: split me here (wordStats and userStats)

// try {
//   user = await updateThemesStats(user);
// } catch (error) {
//   console.error("error while updating themes stats", error);
// }

// try {
//   user = await updateGlobalProgress(user);
// } catch (error) {
//   console.error("error while updating global stats", error);
// }

// // only one writing operation to the db
// try {
//   await replaceUserStats(user);
// } catch (error) {
//   console.error("error while replacing user stats", error);
// }

// TODO : send user stats in response
//   res.send("ok");
// };

export default upsertWordStats;
