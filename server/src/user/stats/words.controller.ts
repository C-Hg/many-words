import getOrCreateWordStats from "./helpers/getOrCreateWordStats.function";
import getUpdatedWordStats from "./helpers/getUpdatedWordStats.function";
import updateWordStats from "./helpers/updateWordStats.function";
import getLessonsToUpdate from "./helpers/getLessonsToUpdate.function";

const wordsController = {
  upsertWordStats: async (exerciseResults, userId: string) => {
    // data received in an array of arrays :
    // [ [enName of the word, source_language, form name, answered correctly?], [...], ... ]

    const allWordsStats = await getOrCreateWordStats(exerciseResults, userId);
    const updatedWordStats = await getUpdatedWordStats(
      allWordsStats,
      exerciseResults
    );
    await updateWordStats(updatedWordStats, userId);

    const lessonsToUpdate = getLessonsToUpdate(allWordsStats);
    return lessonsToUpdate;
  },
};

export default wordsController;
