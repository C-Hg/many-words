import { Request, Response } from "express";

import createWordStats from "./helpers/createWordStats.function";
import getUpdatedGlobalProgress from "./helpers/getUpdatedGlobalProgress.function";
import getUpdatedLessonsStats from "./helpers/getUpdatedLessonsStats.function";
import getUpdatedTopicsStats from "./helpers/getUpdatedThemesStats.function";
import userStatsService from "./userStats.service";
import WordStats from "./interfaces/wordStats.interface";

import logger from "../../logger";
import userService from "../user.service";
import User from "../interfaces/user.interface";
import Word from "../../exercises/interfaces/word.interface";

const userStatsController = {
  // TODO: rename me +/- reorganize
  getOrCreateWordStats: async (
    exerciseResults,
    userId
  ): Promise<WordStats[]> => {
    const allWordStats: Promise<WordStats>[] = exerciseResults.map(
      async (wordResult) => {
        return userStatsController.getWordStats(wordResult[0], userId);
      }
    );
    return Promise.all(allWordStats);
  },

  getWordStats: async (word: Word, user: User): Promise<WordStats> => {
    const englishName = word.english.name;
    const existingWordStats = await userStatsService.findWordStatsByEnglishName(
      user._id,
      englishName
    );
    if (existingWordStats) {
      return existingWordStats.toObject();
    }
    const createdWordStats = await createWordStats(user._id, englishName);
    return createdWordStats;
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
    logger.debug(`[updateStats] updating stats for user ${req.user.id}`);
    const exerciseResults = req.body;
    const userId = req.user.id;
    const user = req.user.toObject();

    // TODO: return updated word stats, used to update user stats
    // TODO: move upsertWordStats here
    // 1) upsert wordStats and return upsertedWordStats
    const lessonsToUpdate = await wordsController.upsertWordStats(
      exerciseResults,
      userId
    );
    const updatedUserStats = await userStatsController.getUpdatedUserStats(
      lessonsToUpdate,
      user
    );

    await userService.updateStats(user, updatedUserStats);
    res.status(200);
    res.send(updatedUserStats);
  },
};

export default userStatsController;
