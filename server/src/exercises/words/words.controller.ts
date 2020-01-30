import getOrCreateWordStats from "./functions/getOrCreateWordStats.function";
import getUpdatedWordStats from "./functions/getUpdatedWordStats.function";
import updateWordStats from "./functions/updateWordStats.function";
import getLessonsToUpdate from "../lessons/getLessonsToUpdate.function";

const wordsController = {
  upsertWordStats: async (exerciseResults, userId: string) => {
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
  },
};

export default wordsController;
