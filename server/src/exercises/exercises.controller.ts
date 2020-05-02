import sample from "lodash.sample";

import exercisesService from "./exercises.service";
import appendWeakestForms from "./helpers/appendWeakestForms.function";
import getAcceptedAnswers from "./helpers/prepareExercise/getAcceptedAnswers.function";
import selectForm from "./helpers/prepareExercise/selectForm.function";
import sortWordStats from "./helpers/sortWordStats.function";

import { Lesson, Word } from "../graphql/types";
import logger from "../logger";
import statsService from "../stats/stats.service";
import { User } from "../user/interfaces/user.interface";

const exercisesController = {
  /**
   * Fetches the words for a given exercise
   */
  getExerciseWords: async (exercise: Lesson, user: User): Promise<void> => {
    try {
      const words = await exercisesService.getLessonWords(exercise);

      // get the wordStats for the words of this lesson
      const wordsStats = await statsService.findWordsStatsForWords(
        user._id,
        words
      );

      // appends the weakest forms for each word, or [] if the word has never been encountered
      const wordsWithWeakestFormsStats = appendWeakestForms(words, wordsStats);

      return exercisesController.prepareWordsForExercise(
        wordsWithWeakestFormsStats
      );
    } catch (error) {
      logger.error(`[getLesson] error while fetching lesson data - ${error}`);
    }
  },

  getWeakWords: async (reference: string, user: User): Promise<void> => {
    try {
      // get words stats for a specific reference
      const wordsStats = await exercisesService.getWordsStats(
        reference,
        user._id
      );
      if (!wordsStats) {
        throw new Error(`No word stats found for user ${user._id}`);
      }

      // sort words stats and keep only the first 50
      const sortedWordsStats = sortWordStats(wordsStats);
      const slicedWordsStats = sortedWordsStats.slice(0, 50);

      // get the words corresponding to the 50 weakest words
      const words = await exercisesService.getWordsFromWordsStats(
        slicedWordsStats
      );

      // filters out the stats of the weakest forms of each word
      const wordsWithWeakestFormsStats = appendWeakestForms(
        words,
        slicedWordsStats
      );

      return exercisesController.prepareWordsForExercise(
        wordsWithWeakestFormsStats
      );
    } catch (error) {
      logger.error(`[getWeakWord] cannot get weak words - ${error}`);
    }
  },

  prepareWordsForExercise: (words: Word[]): any => {
    return words.map((word) => {
      const { weakestForms } = word;
      let formDetails;

      // picks the source language and the form
      const selectionResult = selectForm(word);
      const { form, language, wordToTranslate } = selectionResult;

      const acceptedAnswers = getAcceptedAnswers(word, form, language);

      // only nouns accept articles, special cases when nouns have only certains articles -> hasUniqueForm = true
      let isDefinite;
      let hasArticle = false;
      if (word.type === "noun" && !word.hasUniqueForm) {
        isDefinite = sample([true, false]) as boolean;
        hasArticle = true;
      }

      const selectedWords = returnSelectedWordsWithArticle(
        sourceLanguage,
        word.fr,
        word.en,
        frenchForm,
        englishForm,
        hasArticle,
        isDefinite,
        word.enName
      );
      return {
        acceptedAnswers,
        form,
        language,
        lesson: word.lesson,
        theme: word.theme,
        wordToTranslate, // TODO: assign formattedWordToTranslate
      };
      logger.debug("[prepareWordsForExercise]");
    });
  },

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
