import { Request, Response } from "express";
import { Types } from "mongoose";

import createWordStats from "./helpers/createWordStats.function";
import getUpdatedGlobalProgress from "./helpers/getUpdatedGlobalProgress.function";
import getUpdatedLessonsStats from "./helpers/getUpdatedLessonsStats.function";
import getUpdatedTopicsStats from "./helpers/getUpdatedThemesStats.function";
import getUpdatedWordsResults from "./helpers/getUpdatedWordsResults.function";
import FormResult from "./interfaces/formResult.interface";
import WordResult from "./interfaces/wordResult.interface";
import statsService from "./stats.service";

import logger from "../logger";
import userService from "../user/user.service";

const statsController = {
  /**
   * Produces an array of WordResults promises
   */
  getWordsResults: async (
    formResults: FormResult[],
    userId: Types.ObjectId
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
    userId: Types.ObjectId
  ): Promise<WordResult> => {
    const existingWordStats = await statsService.findWordStatsByEnglishName(
      userId,
      englishName
    );
    if (existingWordStats) {
      return { wordStats: existingWordStats.toObject(), isNew: true };
    }
    const createdWordStats = await createWordStats(userId, englishName);
    return { wordStats: createdWordStats, isNew: false };
  },

  getUpdatedUserStats: async (lessonsToUpdate, user) => {
    const updatedLessonsStats = await getUpdatedLessonsStats(
      lessonsToUpdate,
      user
    );
    const updatedThemesStats = getUpdatedTopicsStats(updatedLessonsStats);
    const updatedGlobalProgress = await getUpdatedGlobalProgress(
      user,
      updatedLessonsStats,
      updatedThemesStats
    );
    const updatedUserStats = {
      ...user.stats,
      lessons: updatedLessonsStats,
      themes: updatedThemesStats,
      globalProgress: updatedGlobalProgress,
    };
    return updatedUserStats;
  },

  updateStats: async (req: Request, res: Response): Promise<void> => {
    logger.debug(`[updateStats] updating stats for user ${req.user._id}`);
    const formResults = req.body;
    const userId = req.user._id;
    const user = req.user.toObject();

    // TODO: return updated word stats, used to update user stats
    // TODO: move upsertWordStats here
    // 1) upsert wordStats and return upsertedWordStats
    try {
      const wordsResults = await statsController.upsertWordsStats(
        formResults,
        userId
      );

      const lessonsToUpdate = getLessonsToUpdate(wordsStats);
      return lessonsToUpdate;
      // 2) get updated user stats in here, without await
      const updatedUserStats = await statsController.getUpdatedUserStats(
        lessonsToUpdate,
        user
      );

      await userService.updateStats(user, updatedUserStats);
      res.status(200);
      res.send(updatedUserStats);

      logger.info(
        `[updateStats] successfully updated stats for user ${req.user._id}`
      );
    } catch (error) {
      logger.error(`[upsertWordStats] cannot get words stats - ${error}`);
    }
  },

  /**
   * Update the wordsStats after an exercise, and return the corresponding wordsResults
   */
  upsertWordsStats: async (
    formResults: FormResult[],
    userId: Types.ObjectId
  ): Promise<WordResult[]> => {
    const wordsResults = await statsController.getWordsResults(
      formResults,
      userId
    );
    const updatedWordResults = getUpdatedWordsResults(
      wordsResults,
      formResults
    );
    await statsService.replaceWordsStats(userId, updatedWordResults);
    return updatedWordResults;
  },
};

export default statsController;
