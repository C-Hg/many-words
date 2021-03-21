import sample from "lodash.sample";

import exercisesService from "./exercises.service";
import appendWeakestForms from "./helpers/appendWeakestForms.function";
import getAnswers from "./helpers/prepareExercise/getAnswers.function";
import selectForm from "./helpers/prepareExercise/selectForm.function";
import { ThresholdsStatus } from "./types/completionThreshold.type";
import {
  CurriculumDocument,
  NextExerciseMode,
} from "./types/curriculum.interface";
import { ARTICLE_FORMS } from "./types/name.interface";

import { Word, ExerciseWord, Exercise } from "../graphql/types";
import statsService from "../stats/stats.service";
import { User } from "../user/interfaces/user.interface";
import logger from "../utils/logger";

const exercisesController = {
  /**
   * Fetches the words for a given exercise
   */
  getNextExercise: async (user: User): Promise<Exercise> => {
    logger.debug(`[getNextExercise] user ${user.id}`);
    // TODO: actual exercise selection
    // const { id, type } = selectNextExercise(user.id)
    const id = "animalsBasics";
    const type = "quiz";
    logger.info(`Next exercise for ${user.id} is ${id}`);
    const rawWords = await exercisesService.getLessonWords(id);

    // get the wordStats for the words of this lesson
    const wordsStats = await statsService.findWordsStatsForWords(
      user._id,
      rawWords
    );

    // appends the weakest forms for each word, or [] if the word has never been encountered
    const wordsWithWeakestFormsStats = appendWeakestForms(rawWords, wordsStats);

    const preparedWords = exercisesController.prepareWordsForExercise(
      wordsWithWeakestFormsStats
    );
    return {
      id,
      type,
      words: preparedWords,
    };
  },

  /**
   * Selects the next exercise of a curriculum
   * The new lesson selected is based on the order of the curriculum
   * The closest lesson from the start, not selected yet, is added
   */
  // TODO: @V2 shouldDoWeakWords
  selectNextExercise: async (userId: string): Promise<CurriculumDocument> => {
    const curriculum = await exercisesService.getCurriculum(userId);
    const { lessons } = curriculum;

    if (exercisesService.shouldDoLastLesson(lessons)) {
      // nextExercise is the last lesson in the array
      const lastLessonId = lessons[lessons.length - 1].name;
      return exercisesService.setNextExercise(curriculum.id, {
        mode: NextExerciseMode.Quiz,
        ressourceId: lastLessonId,
      });
    }

    if (lessons.length === 1) {
      return exercisesService.selectNewLesson(curriculum, lessons);
    }

    if (exercisesService.shouldDoPenultimateLesson(lessons)) {
      // nextExercise is the penultimate lesson in the array
      const penultimateLessonId = lessons[lessons.length - 2].name;
      return exercisesService.setNextExercise(curriculum.id, {
        mode: NextExerciseMode.Quiz,
        ressourceId: penultimateLessonId,
      });
    }

    const completionThresholds = exercisesService.getCompletionThresholds(
      lessons.length
    );
    const thresholdsStatus = exercisesService.areThresholdsMet(
      0,
      lessons,
      completionThresholds
    );
    // All thresholds are met, add a new lesson to the curriculum if there is any left
    if (thresholdsStatus === ThresholdsStatus.met) {
      const areAllLessonsInCurriculum = exercisesService.getAreAllLessonsInCurriculum(
        lessons.length
      );
      if (!areAllLessonsInCurriculum) {
        return exercisesService.selectNewLesson(curriculum, lessons);
      }
      // All lessons are already in the curriculum, select the weakest one
      const lowestScoreLesson = exercisesService.getLowestScoreLesson(lessons);
      return exercisesService.setNextExercise(curriculum.id, {
        mode: NextExerciseMode.Quiz,
        ressourceId: lowestScoreLesson,
      });
    }

    // A threshold is not met, select the closest lesson to threshold
    const closestLessonToThreshold = exercisesService.getClosestLessonToThreshold(
      lessons,
      thresholdsStatus
    );
    return exercisesService.setNextExercise(curriculum.id, {
      mode: NextExerciseMode.Quiz,
      ressourceId: closestLessonToThreshold,
    });
  },

  // getWeakWords: async (
  //   reference: string,
  //   user: User
  // ): Promise<ExerciseWord[]> => {
  //   logger.debug(`[getWeakWords] reference ${reference}, user ${user.id}`);
  //   // get words stats for a specific reference
  //   const wordsStats = await exercisesService.getWordsStats(
  //     reference,
  //     user._id
  //   );
  //   if (!wordsStats) {
  //     logger.error(`No word stats found for user ${user._id}`);
  //     throw error500();
  //   }

  //   // sort words stats and keep only the first 50
  //   const sortedWordsStats = sortWordStats(wordsStats);
  //   const slicedWordsStats = sortedWordsStats.slice(0, 50);

  //   // get the words corresponding to the 50 weakest words
  //   const words = await exercisesService.getWordsFromWordsStats(
  //     slicedWordsStats
  //   );

  //   // filters out the stats of the weakest forms of each word
  //   const wordsWithWeakestFormsStats = appendWeakestForms(
  //     words,
  //     slicedWordsStats
  //   );

  //   return exercisesController.prepareWordsForExercise(
  //     wordsWithWeakestFormsStats
  //   );
  // },

  prepareWordsForExercise: (words: Word[]): ExerciseWord[] =>
    words.map((word) => {
      let articleForm;
      if (word.type === "noun" && !word.hasUniqueForm) {
        articleForm = sample([
          ARTICLE_FORMS.Definite,
          ARTICLE_FORMS.Indefinite,
        ]);
      }

      // picks the source language and the form
      const selectionResult = selectForm(word, articleForm);
      const { form, language, wordToTranslate } = selectionResult;

      const answers = getAnswers(word, form, language, articleForm);

      const {
        lesson,
        topic,
        english: { name },
      } = word;

      return {
        answers,
        englishName: name,
        form,
        language,
        lesson,
        topic,
        wordToTranslate,
      };
    }),

  // getWordsToLearn: async (req: Request, res: Response): Promise<void> => {
  //   try {
  //     const words = await exercisesService.getLessonWords(req.params.lesson);
  //     res.send(JSON.stringify(words));
  //   } catch (error) {
  //     logger.error(
  //       "[getWordsToLearn] error while fetching words to learn",
  //       error
  //     );
  //   }
  // },
};

export default exercisesController;
