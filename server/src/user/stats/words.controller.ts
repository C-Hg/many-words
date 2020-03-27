import getUpdatedWordStats from "./helpers/getUpdatedWordStats.function";
import updateWordStats from "./helpers/updateWordStats.function";
import getLessonsToUpdate from "./helpers/getLessonsToUpdate.function";
import logger from "../../logger";
import userStatsController from "./userStats.controller";

const wordsController = {
  upsertWordStats: async (exerciseResults, userId: string) => {
    // data received in an array of arrays :
    // [ [enName of the word, source_language, form name, answered correctly?], [...], ... ]

    try {
      const allWordsStats = await userStatsController.getOrCreateWordStats(
        exerciseResults,
        userId
      );
    } catch (error) {
      logger.error(`[upsertWordStats] cannot get words stats - ${error}`);
    }

    const updatedWordStats = getUpdatedWordStats(
      allWordsStats,
      exerciseResults
    );
    await updateWordStats(updatedWordStats, userId);

    const lessonsToUpdate = getLessonsToUpdate(allWordsStats);
    return lessonsToUpdate;
  },
};

export default wordsController;
