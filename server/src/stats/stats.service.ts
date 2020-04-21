import { ObjectID } from "mongodb";
import { Query } from "mongoose";

import WordResult from "./interfaces/wordResult.interface";
import { WordStatsDocument } from "./interfaces/wordStats.interface";
import WordStatsModel from "./models/wordStats.model";

import { Word } from "../exercises/interfaces/word.interface";
import { Stats } from "../graphql/types";
import logger from "../logger";
import { UserDocument, User } from "../user/interfaces/user.interface";
import UserModel from "../user/models/user.model";

const statsService = {
  findWordsStatsForWords: async (
    userId: ObjectID,
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
    userId: ObjectID,
    englishName: string
  ): Promise<WordStatsDocument | null> => {
    return WordStatsModel.findOne({ userId, englishName });
  },

  // TODO: test me
  updateWordsStats: async (
    userId: ObjectID,
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
      throw new Error(`[updateStats] cannot update user ${user.id}`);
    }
    return updatedUser;
  },
};

export default statsService;
