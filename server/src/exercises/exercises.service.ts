import { ObjectID } from "mongodb";

import Word from "./interfaces/word.interface";
import WordModel from "./models/word.model";

import WordStats from "../user/stats/interfaces/wordStats.interface";
import WordStatsModel from "../user/stats/models/wordStats.model";

const exercisesService = {
  /**
   * Gets all words in a lesson
   */
  getLessonWords: async (lesson: string): Promise<Word[]> => {
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
    reference: string,
    userId: ObjectID
  ): Promise<WordStats[]> => {
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
  findWordByEnglishName: async (englishName: string): Promise<Word> => {
    const word = await WordModel.findOne({ "english.name": englishName });
    if (!word) {
      throw new Error(`Word ${englishName} not found`);
    }
    return word;
  },
};

export default exercisesService;
