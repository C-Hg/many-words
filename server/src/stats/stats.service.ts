import { ObjectID } from "mongodb";
import { Query } from "mongoose";

import WordResult from "./interfaces/wordResult.interface";
import { WordStatsDocument } from "./interfaces/wordStats.interface";
import WordStatsModel from "./models/wordStats.model";

import CurriculumModel from "../exercises/models/curriculum.model";
import { CurriculumDocument } from "../exercises/types/curriculum.interface";
import { Word } from "../graphql/types";
import { UserDocument, User } from "../user/interfaces/user.interface";
import UserModel from "../user/models/user.model";
import error500 from "../utils/errors/error500";
import logger from "../utils/logger";

const statsService = {
  getCurriculum: async (userId: string): Promise<CurriculumDocument> => {
    const curriculum = await CurriculumModel.findOne({ userId });
    if (!curriculum) {
      logger.error(`[getCurriculum] cannot find curriculum for user ${userId}`);
      throw error500;
    }
    return curriculum;
  },

  findWordsStatsForWords: async (
    userId: string,
    words: Word[]
  ): Promise<(WordStatsDocument | null)[]> => {
    return Promise.all(
      words.map(async (word) => {
        const wordStats = await statsService.findWordStatsByEnglishName(
          userId,
          word.english.name
        );
        return wordStats;
      })
    );
  },

  findWordStatsByEnglishName: async (
    userId: string,
    englishName: string
  ): Promise<WordStatsDocument | null> => {
    return WordStatsModel.findOne({ userId, englishName });
  },

  // TODO: test me
  updateWordsStats: async (
    userId: string,
    WordsResults: WordResult[]
  ): Promise<Query<WordStatsDocument>[]> => {
    const replacePromises = WordsResults.map(async (wordResults) => {
      const { wordStats } = wordResults;
      return WordStatsModel.updateOne(
        { englishName: wordStats.englishName, userId },
        wordStats,
        { upsert: true }
      );
    });
    return Promise.all(replacePromises);
  },

  /**
   * Update user stats by user _id
   */
  updateStats: async (
    user: User,
    updatedUserStats: Stats
  ): Promise<UserDocument> => {
    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      {
        stats: updatedUserStats,
      },
      { new: true }
    );
    if (!updatedUser) {
      logger.error(`[updateStats] cannot update user ${user.id}`);
      throw error500;
    }
    return updatedUser;
  },
};

export default statsService;
