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

export default upsertWordStats;
