import { ObjectID } from "mongodb";

import {
  CurriculumNames,
  LAST_LESSON_MINIMUM_COMPLETION,
  NextExerciseMode,
  PENULTIMATE_LESSON_MINIMUM_COMPLETION,
} from "./constants";
import { frenchEnglishCurriculum } from "./data/curriculums/frenchEnglish";
import {
  CurriculumDocument,
  LessonCompletion,
  NextExercise,
} from "./interfaces/curriculum.interface";
import { WordDocument } from "./interfaces/word.interface";
import CurriculumModel from "./models/curriculum.model";
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
    return CurriculumModel.create(newCurriculum);
  },

  /**
   * Gets the curriculum document for a user
   */
  getCurriculum: async (userId: string): Promise<CurriculumDocument> => {
    const curriculum = await CurriculumModel.findOne({ userId });
    if (!curriculum) {
      logger.error(
        `[getCurriculum] could not find curriculum for user ${userId}`
      );
      throw error500;
    }
    return curriculum;
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

  /**
   * Sets the next exercise of a curriculum
   */
  setNextExercise: async (
    curriculumId: string,
    nextExercise: NextExercise
  ): Promise<CurriculumDocument> => {
    const updatedCurriculum = await CurriculumModel.findByIdAndUpdate(
      curriculumId,
      { nextExercise }
    );
    if (!updatedCurriculum) {
      logger.error(
        `[setNextExercise] could not find curriculum ${curriculumId}`
      );
      throw error500();
    }
    return updatedCurriculum;
  },

  /**
   * Gets the ressourceId of the next lesson in the curriculum
   * TODO: manage the end of the curriculum: all lessons already there: end reached, select lowest score
   */
  getNewCurriculumLesson: (lessonIndex: number): string => {
    return "";
  }

  /**
   * Selects the next exercise of a curriculum
   * The new lesson selected is based on the order of the curriculum
   * The closest lesson from the start, not selected yet, is added
   */
  selectNewExercise: async (userId: string): Promise<CurriculumDocument> => {
    return curriculum;
  },

  shouldDoLastLesson: (lessons: LessonCompletion[]): boolean => {
    const lastLessonIndex = lessons.length - 1;
    return lessons[lastLessonIndex].completion < LAST_LESSON_MINIMUM_COMPLETION;
  },

  shouldDoPenultimateLesson: (lessons: LessonCompletion[]): boolean => {
    const penultimateLessonIndex = lessons.length - 2;
    return (
      lessons[penultimateLessonIndex].completion <
      PENULTIMATE_LESSON_MINIMUM_COMPLETION
    );
  },
};

export default exercisesService;
