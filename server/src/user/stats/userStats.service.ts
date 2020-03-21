import WordStatsModel from "./words/models/wordStats.model";
import WordStats from "../stats/words/interfaces/wordStats.interface";
import { ObjectID } from "mongodb";

const userStatsService = {
  findWordStatsByEnglishReference: async (
    userId: ObjectID,
    word: string
  ): Promise<WordStats> => {
    return WordStatsModel.findOne({ userId, englishReference: word });
  },
};

export default userStatsService;
