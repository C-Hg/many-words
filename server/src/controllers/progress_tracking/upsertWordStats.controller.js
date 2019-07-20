import updateWordStats from "./words/updateWordStats.function";
import getUpdatedWordStats from "./words/getUpdatedWordStats.function";
import getOrCreateWordStats from "./words/getOrCreateWordStats.function";
import getLessonsToUpdate from "./lessons/getLessonsToUpdate.function";

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
