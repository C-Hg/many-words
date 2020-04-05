import { Request, Response } from "express";
import { Types } from "mongoose";

import getUpdatedGlobalProgress from "./helpers/getUpdatedGlobalProgress.function";
import updateLessonsStats from "./helpers/lessons/updateLessonsStats.function";
import updateTopicsStats from "./helpers/topics/updateTopicsStats.function";
import createWordStats from "./helpers/words/createWordStats.function";
import getUpdatedWordsResults from "./helpers/words/getUpdatedWordsResults.function";
import FormResult from "./interfaces/formResult.interface";
import WordResult from "./interfaces/wordResult.interface";
import statsService from "./stats.service";

import logger from "../logger";

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
    const updatedGlobalProgress = await getUpdatedGlobalProgress(
      user,
      updatedLessonsStats,
      updatedThemesStats
    );

    return updatedUserStats;
  },

  updateStats: async (req: Request, res: Response): Promise<void> => {
    logger.debug(`[updateStats] updating stats for user ${req.user._id}`);
    const formResults = req.body;
    const userId = req.user._id;
    const user = req.user.toObject();

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
      const updatedLessonsStats = updateLessonsStats(wordsResults, user);

      // Update topics stats
      const updatedTopicsStats = updateTopicsStats(updatedLessonsStats);

      // TODO: global progress with minimal parameters
      const updatedUserStats = {
        lessons: updatedLessonsStats,
        topics: updatedTopicsStats,
        globalProgress: updatedGlobalProgress,
      };

      await statsService.updateStats(user, updatedUserStats);
      res.status(200);
      res.send(updatedUserStats);

      logger.info(
        `[updateStats] successfully updated stats for user ${req.user._id}`
      );
    } catch (error) {
      logger.error(`[upsertWordStats] cannot update user stats - ${error}`);
    }
  },
};

export default statsController;
