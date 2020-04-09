import { ObjectID } from "mongodb";
import { Query } from "mongoose";

import WordResult from "./interfaces/wordResult.interface";
import { WordStatsDocument, WordStats } from "./interfaces/wordStats.interface";
import WordStatsModel from "./models/wordStats.model";

import { Word } from "../exercises/interfaces/word.interface";
import { UserDocument } from "../user/interfaces/user.interface";
import User from "../user/models/user.model";

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
  replaceWordsStats: async (
    userId: ObjectID,
    WordsResults: WordResult[]
  ): Promise<Query<WordStatsDocument>[]> => {
    const replacePromises = WordsResults.map(async (wordResults) => {
      const { wordStats } = wordResults;
      return WordStatsModel.replaceOne(
        { englishName: wordStats.englishName, userId },
        wordStats
      );
    });
    return Promise.all(replacePromises);
  },

  updateStats: async (
    user: UserDocument,
    updatedUserStats: WordStats
  ): Promise<UserDocument | null> => {
    return User.findByIdAndUpdate(user._id, { stats: updatedUserStats });
  },
};

export default statsService;
