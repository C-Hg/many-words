import WordStatsModel from "./models/wordStats.model";
import WordStats from "./interfaces/wordStats.interface";
import { ObjectID } from "mongodb";

const userStatsService = {
  findWordStatsByEnglishName: async (
    userId: ObjectID,
    englishName: string
  ): Promise<WordStats | null> => {
    return WordStatsModel.findOne({ userId, englishName });
  },
};

export default userStatsService;
