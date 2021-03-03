import { ObjectID } from "mongodb";

import { CurriculumNames, NextExerciseMode } from "./constants";
import { frenchEnglishCurriculum } from "./data/curriculums/frenchEnglish";
import { CurriculumDocument } from "./interfaces/curriculum.interface";
import { WordDocument } from "./interfaces/word.interface";
import Curriculum from "./models/curriculum.model";
import WordModel from "./models/word.model";

import { Lesson, Topic, Word } from "../graphql/types";
import {
  WordStats,
  WordStatsDocument,
} from "../stats/interfaces/wordStats.interface";
import WordStatsModel from "../stats/models/wordStats.model";
import error500 from "../utils/errors/error500";
import logger from "../utils/logger";

const exercisesService = {
  /**
   *
   * @param newUser
   */
  createCurriculum: async (userId: string): Promise<CurriculumDocument> => {
    const newCurriculum = {
      exercisesSinceWeakWords: 0,
      lessons: [],
      name: CurriculumNames.frenchEnglish,
      nextExercise: {
        mode: NextExerciseMode.quiz,
        ressourceId: frenchEnglishCurriculum.lessonsIds[0],
      },
      userId,
    };
    return Curriculum.create(newCurriculum);
  },

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
          throw error500();
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
      throw error500();
    }
    return word;
  },
};

export default exercisesService;
