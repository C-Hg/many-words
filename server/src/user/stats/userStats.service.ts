import { ObjectID } from "mongodb";

import WordStats from "./interfaces/wordStats.interface";
import WordStatsModel from "./models/wordStats.model";

const userStatsService = {
  findWordStatsByEnglishName: async (
    userId: ObjectID,
    englishName: string
  ): Promise<WordStats | null> => {
    return WordStatsModel.findOne({ userId, englishName });
  },
};

export default userStatsService;
