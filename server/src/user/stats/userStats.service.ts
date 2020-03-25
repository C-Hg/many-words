import WordStatsModel from "./models/wordStats.model";
import WordStats from "./interfaces/wordStats.interface";
import { ObjectID } from "mongodb";

const userStatsService = {
  findWordStatsByEnglishReference: async (
    userId: ObjectID,
    word: string
  ): Promise<WordStats | null> => {
    return WordStatsModel.findOne({ userId, englishReference: word });
  },
};

export default userStatsService;
