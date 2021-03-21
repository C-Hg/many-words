import { cloneDeep } from "lodash";
import { ObjectID } from "mongodb";

import {
  COMPLETION_THRESHOLDS,
  LAST_LESSON_MINIMUM_COMPLETION,
  PENULTIMATE_LESSON_MINIMUM_COMPLETION,
} from "./constants";
import { frenchEnglishCurriculum } from "./data/curriculums/frenchEnglish";
import CurriculumModel from "./models/curriculum.model";
import WordModel from "./models/word.model";
import {
  CompletionThreshold,
  ThresholdsStatus,
} from "./types/completionThreshold.type";
import {
  CurriculumDocument,
  CurriculumNames,
  LessonCompletion,
  NextExerciseMode,
} from "./types/curriculum.interface";
import { WordDocument } from "./types/word.interface";

import { Lesson, NextExercise, Topic, Word } from "../graphql/types";
import {
  WordStats,
  WordStatsDocument,
} from "../stats/interfaces/wordStats.interface";
import WordStatsModel from "../stats/models/wordStats.model";
import error500 from "../utils/errors/error500";
import logger from "../utils/logger";

const exercisesService = {
  /**
   * Recursively checks that all thresholds are met
   * i.e. checks that the user has learned the lessons
   * Returns "met" or the expected CompletionThreshold.successRate that is not met yet
   */
  areThresholdsMet: (
    counter: number,
    lessons: LessonCompletion[],
    completionThresholds: CompletionThreshold[]
  ): ThresholdsStatus.met | number => {
    // exits successfully if all thresholds have been checked
    if (counter === completionThresholds.length) {
      return ThresholdsStatus.met;
    }

    const percentageOfLessonsMeetingThreshold = exercisesService.getThresholdSuccessRate(
      lessons,
      completionThresholds[counter].expectedRate
    );
    if (
      percentageOfLessonsMeetingThreshold >=
      completionThresholds[counter].percentageOfLessons
    ) {
      return exercisesService.areThresholdsMet(
        counter + 1,
        lessons,
        completionThresholds
      );
    }
    return completionThresholds[counter].expectedRate;
  },

  /**
   * Creates a new curriculum document for the user
   */
  createCurriculum: async (userId: string): Promise<CurriculumDocument> => {
    const newCurriculum = {
      exercisesSinceWeakWords: 0,
      lessons: [],
      name: CurriculumNames.FrenchEnglish,
      nextExercise: {
        mode: NextExerciseMode.Quiz,
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
   * Returns the success rate for the lesson given at a given threshold, inclusively
   * i.e. what percentage of the lessons have a completion score equal or greater than the threshold
   */
  getThresholdSuccessRate: (
    lessons: LessonCompletion[],
    threshold: number
  ): number => {
    const lessonsMeetingThreshold = lessons.reduce((accumulator, lesson) => {
      if (lesson.completion >= threshold) {
        return accumulator + 1;
      }
      return accumulator;
    }, 0);
    return lessonsMeetingThreshold / lessons.length;
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
   * Returns true if all lessons are already in the curriculum array
   */
  getAreAllLessonsInCurriculum: (lessonsInCurriculum: number): boolean => {
    return lessonsInCurriculum >= frenchEnglishCurriculum.lessonsIds.length;
  },

  /**
   * Gets the ressourceId of the next lesson in the curriculum
   */
  getNewCurriculumLesson: (lessonsInCurriculum: number): string => {
    // if there is one lesson in the curriculum, we want the second element of the reference curriculum array
    return frenchEnglishCurriculum.lessonsIds[lessonsInCurriculum];
  },

  /**
   * Return the success rates required, depending on the number of lessons already encountered
   */
  getCompletionThresholds: (
    lessonsCompleted: number
  ): CompletionThreshold[] => {
    if (lessonsCompleted < 5) {
      return COMPLETION_THRESHOLDS.LESS_THAN_FIVE;
    } else if (lessonsCompleted < 10) {
      return COMPLETION_THRESHOLDS.LESS_THAN_TEN;
    } else if (lessonsCompleted < 15) {
      return COMPLETION_THRESHOLDS.LESS_THAN_FIFTEEN;
    } else if (lessonsCompleted < 20) {
      return COMPLETION_THRESHOLDS.LESS_THAN_TWENTY;
    } else if (lessonsCompleted < 25) {
      return COMPLETION_THRESHOLDS.LESS_THAN_TWENTY_FIVE;
    } else if (lessonsCompleted < 30) {
      return COMPLETION_THRESHOLDS.LESS_THAN_THIRTY;
    } else if (lessonsCompleted < 40) {
      return COMPLETION_THRESHOLDS.LESS_THAN_FORTY;
    } else {
      return COMPLETION_THRESHOLDS.MORE_THAN_FORTY;
    }
  },

  /**
   * Selects the closest lesson to the threshold that is not met
   */
  getClosestLessonToThreshold: (
    lessons: LessonCompletion[],
    threshold: number
  ): string => {
    const filteredLessons = lessons.filter(
      (lesson) => lesson.completion < threshold
    );
    // do not mutate the lessons array
    const nextLesson = filteredLessons.sort(
      (a, b) => b.completion - a.completion
    )[0];
    return nextLesson.name;
  },

  /**
   * Returns the id of the lesson with the lowest completion score
   */
  getLowestScoreLesson: (lessons: LessonCompletion[]): string => {
    // do not mutate the lessons array
    const copiedLessons = cloneDeep(lessons);
    const lowestScoreLesson = copiedLessons.sort(
      (a, b) => a.completion - b.completion
    )[0];
    return lowestScoreLesson.name;
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
