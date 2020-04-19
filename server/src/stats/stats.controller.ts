import { Request, Response } from "express";
import { Types } from "mongoose";

import updateGlobalStats from "./helpers/global/updateGlobalStats.function";
import updateLessonsStats from "./helpers/lessons/updateLessonsStats.function";
import updateTopicsStats from "./helpers/topics/updateTopicsStats.function";
import createWordStats from "./helpers/words/createWordStats.function";
import getUpdatedWordsResults from "./helpers/words/getUpdatedWordsResults.function";
import FormResult from "./interfaces/formResult.interface";
import WordResult from "./interfaces/wordResult.interface";
import statsService from "./stats.service";

import logger from "../logger";
import { User } from "../user/interfaces/user.interface";

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

  updateStats: async (user: User, formResults: FormResult[]): Promise<void> => {
    const userId = user._id;
    logger.debug(`[updateStats] updating stats for user ${userId}`);

    try {
      // Update word stats first
      const wordsResults = await statsController.getWordsResults(
        formResults,
        userId
      );
      const updatedWordResults = getUpdatedWordsResults(
        wordsResults,
        formResults
      );
      await statsService.replaceWordsStats(userId, updatedWordResults);

      // Update lessons stats
      const updatedLessonsStats = updateLessonsStats(
        wordsResults,
        user.stats.lessons
      );

      // Update topics stats
      const updatedTopicsStats = updateTopicsStats(updatedLessonsStats);

      // Update global stats
      const updatedGlobalStats = updateGlobalStats(
        updatedWordResults,
        updatedLessonsStats,
        user.stats.global
      );

      const updatedUserStats = {
        lessons: updatedLessonsStats,
        topics: updatedTopicsStats,
        global: updatedGlobalStats,
      };

      await statsService.updateStats(user, updatedUserStats);

      logger.info(
        `[updateStats] successfully updated stats for user ${userId}`
      );
    } catch (error) {
      logger.error(`[upsertWordStats] cannot update user stats - ${error}`);
    }
  },
};

export default statsController;
