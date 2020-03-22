import Word from "./interfaces/word.interface";
import WordModel from "./models/word.model";
import WordStatsModel from "../user/stats/words/models/wordStats.model";
import { ObjectID } from "mongodb";
import WordStats from "../user/stats/words/interfaces/wordStats.interface";

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
      wordsStats.map(async wordStats => {
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
   * TODO: strong typing for references
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
};

export default exercisesService;
