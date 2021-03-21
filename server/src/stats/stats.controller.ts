import updateGlobalStats from "./helpers/global/updateGlobalStats.function";
import getUpdatedLessons from "./helpers/lessons/getUpdatedLessons.function";
import createWordStats from "./helpers/words/createWordStats.function";
import getUpdatedWordsResults from "./helpers/words/getUpdatedWordsResults.function";
import FormResult from "./interfaces/formResult.interface";
import WordResult from "./interfaces/wordResult.interface";
import statsService from "./stats.service";

import exercisesController from "../exercises/exercises.controller";
import exercisesService from "../exercises/exercises.service";
import { User } from "../user/interfaces/user.interface";
import logger from "../utils/logger";

const statsController = {
  /**
   * Produces an array of WordResults promises
   */
  getWordsResults: async (
    formResults: FormResult[],
    userId: string
  ): Promise<WordResult[]> => {
    return Promise.all(
      formResults.map(async (formResult) =>
        statsController.getOrCreateWordStats(formResult.englishName, userId)
      )
    );
  },

  /**
   * For each word, returns a WordStats object, existing or created, and associates isNew
   */
  getOrCreateWordStats: async (
    englishName: string,
    userId: string
  ): Promise<WordResult> => {
    const existingWordStats = await statsService.findWordStatsByEnglishName(
      userId,
      englishName
    );
    if (existingWordStats) {
      return { wordStats: existingWordStats.toObject(), isNew: false };
    }
    const createdWordStats = await createWordStats(userId, englishName);
    return { wordStats: createdWordStats, isNew: true };
  },

  updateStats: async (user: User, formResults: FormResult[]): Promise<void> => {
    const userId = user.id;
    logger.debug(`[updateStats] updating stats for user ${userId}`);

    // Update word stats first
    const wordsResults = await statsController.getWordsResults(
      formResults,
      userId
    );
    const updatedWordsResults = getUpdatedWordsResults(
      wordsResults,
      formResults
    );
    await statsService.updateWordsStats(userId, updatedWordsResults);

    // Update lessons stats in the curriculum document
    const curriculum = await exercisesService.getCurriculum(userId);
    const { lessons, stats } = curriculum;

    const updatedLessons = getUpdatedLessons(updatedWordsResults, lessons);

    // Update global stats
    const updatedGlobalStats = updateGlobalStats(
      updatedWordsResults,
      updatedLessons,
      stats
    );

    await statsService.updateCurriculumStats(
      updatedLessons,
      user.id,
      updatedGlobalStats
    );

    logger.info(`[updateStats] successfully updated stats for user ${userId}`);
    await exercisesController.selectNextExercise(user.id);
    // TODO: avoid 2nd call to getCurriculum ?
  },
};

export default statsController;
