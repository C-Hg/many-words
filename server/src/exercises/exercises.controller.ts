import sample from "lodash.sample";

import exercisesService from "./exercises.service";
import appendWeakestForms from "./helpers/appendWeakestForms.function";
import getAnswers from "./helpers/prepareExercise/getAnswers.function";
import selectForm from "./helpers/prepareExercise/selectForm.function";
import sortWordStats from "./helpers/sortWordStats.function";
import { ARTICLE_FORMS } from "./interfaces/name.interface";

import { Lesson, Word, ExerciseWord } from "../graphql/exercises.types";
import statsService from "../stats/stats.service";
import { User } from "../user/interfaces/user.interface";
import error500 from "../utils/error500";
import logger from "../utils/logger";

const exercisesController = {
  /**
   * Fetches the words for a given exercise
   */
  getExerciseWords: async (
    exercise: Lesson,
    user: User
  ): Promise<ExerciseWord[]> => {
    logger.debug(`[getExerciseWords] exercise ${exercise}, user ${user.id}`);
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
  },

  getWeakWords: async (
    reference: string,
    user: User
  ): Promise<ExerciseWord[]> => {
    logger.debug(`[getWeakWords] reference ${reference}, user ${user.id}`);
    // get words stats for a specific reference
    const wordsStats = await exercisesService.getWordsStats(
      reference,
      user._id
    );
    if (!wordsStats) {
      logger.error(`No word stats found for user ${user._id}`);
      throw error500();
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
  },

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
      const { form, language } = selectionResult;
      const { wordToTranslate } = selectionResult;

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
