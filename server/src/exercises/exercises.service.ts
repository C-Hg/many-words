import { ObjectID } from "mongodb";

import { Word, WordDocument } from "./interfaces/word.interface";
import WordModel from "./models/word.model";

import { Lesson, Topic } from "../graphql/types";
import logger from "../logger";
import {
  WordStats,
  WordStatsDocument,
} from "../stats/interfaces/wordStats.interface";
import WordStatsModel from "../stats/models/wordStats.model";

const exercisesService = {
  /**
   * Gets all words in a lesson
   */
  getLessonWords: async (lesson: Lesson): Promise<Word[]> => {
    return WordModel.find({ lesson });
  },

  /**
   * Gets the words matching an array of wordStats
   */
  getWordsFromWordsStats: async (wordsStats: WordStats[]): Promise<Word[]> => {
    return Promise.all(
      wordsStats.map(async (wordStats) => {
        const { englishName } = wordStats;
        const word = await WordModel.findOne({ englishName });
        if (!word) {
          logger.error(
            `[getWordsFromWordsStats] could not find word ${englishName}`
          );
          throw new Error(
            `[getWordsFromWordsStats] could not find word ${englishName}`
          );
        }
        return word;
      })
    );
  },

  /**
   * Fetches the weak words for a logged user, depending on the reference selected
   * // TODO: strong typing for references
   */
  getWordsStats: async (
    reference: "curriculum" | Topic,
    userId: ObjectID
  ): Promise<WordStatsDocument[]> => {
    if (reference === "curriculum") {
      // gets all wordStats
      return WordStatsModel.find({ userId });
    } else {
      // gets the wordStats for a specific topic
      return WordStatsModel.find({ userId, topic: reference });
    }
  },

  /**
   * Finds a word by its english reference
   */
  findWordByEnglishName: async (englishName: string): Promise<WordDocument> => {
    const word = await WordModel.findOne({ "english.name": englishName });
    if (!word) {
      logger.error(`[findWordByEnglishName] Word ${englishName} not found`);
      throw new Error(`[findWordByEnglishName] Word ${englishName} not found`);
    }
    return word.toObject();
  },
};

export default exercisesService;
