import { Request, Response } from "express";
import { Types } from "mongoose";

import createWordStats from "./helpers/createWordStats.function";
import getUpdatedGlobalProgress from "./helpers/getUpdatedGlobalProgress.function";
import getUpdatedLessonsStats from "./helpers/getUpdatedLessonsStats.function";
import getUpdatedTopicsStats from "./helpers/getUpdatedThemesStats.function";
import getUpdatedWordStats from "./helpers/getUpdatedWordStats.function";
import ExerciseResult from "./interfaces/exerciseResult.interface";
import WordStats from "./interfaces/wordStats.interface";
import WordStatsToUpdate from "./interfaces/wordStatsToUpdate.interface";
import userStatsService from "./userStats.service";

import logger from "../../logger";
import userService from "../user.service";

const userStatsController = {
  getWordStats: async (
    exerciseResults: ExerciseResult[],
    userId: Types.ObjectId
  ): Promise<WordStatsToUpdate[]> => {
    return Promise.all(
      exerciseResults.map(async (exerciseResult) => {
        return userStatsController.getOrCreateWordStats(
          exerciseResult.englishName,
          userId
        );
      })
    );
  },

  getOrCreateWordStats: async (
    englishName: string,
    userId: Types.ObjectId
  ): Promise<WordStatsToUpdate> => {
    const existingWordStats = await userStatsService.findWordStatsByEnglishName(
      userId,
      englishName
    );
    if (existingWordStats) {
      // TODO: test for real if it works with the option toObject() set in the schema directly
      return { wordStats: existingWordStats, isNew: true };
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
    const exerciseResults = req.body;
    const userId = req.user._id;
    const user = req.user.toObject();

    // TODO: return updated word stats, used to update user stats
    // TODO: move upsertWordStats here
    // 1) upsert wordStats and return upsertedWordStats
    try {
      const updatedWordsStats = await userStatsController.upsertWordStats(
        exerciseResults,
        userId
      );
      // 2) get updated user stats in here, without await
      const updatedUserStats = await userStatsController.getUpdatedUserStats(
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

  upsertWordStats: async (
    exerciseResults: ExerciseResult[],
    userId: Types.ObjectId
  ): Promise<WordStats[]> => {
    const wordsStatsToUpdate = await userStatsController.getWordStats(
      exerciseResults,
      userId
    );
    const updatedWordStats = getUpdatedWordStats(wordsStats, exerciseResults);
    await updateWordStats(updatedWordStats, userId);
    return updatedWordStats;

    const lessonsToUpdate = getLessonsToUpdate(wordsStats);
    return lessonsToUpdate;
  },
};

export default userStatsController;
