import { ObjectID } from "mongodb";
import { Query } from "mongoose";

import WordResult from "./interfaces/wordResult.interface";
import { WordStatsDocument } from "./interfaces/wordStats.interface";
import WordStatsModel from "./models/wordStats.model";

const statsService = {
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
};

export default statsService;
