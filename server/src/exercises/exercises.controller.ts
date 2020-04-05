import { Request, Response } from "express";

import exercisesService from "./exercises.service";
import appendWeakestForms from "./helpers/appendWeakestForms.function";
import sortWordStats from "./helpers/sortWordStats.function";

import logger from "../logger";
import statsService from "../stats/stats.service";

const exercisesController = {
  /**
   * fetches the words for the lesson
   */
  getLesson: async (req: Request, res: Response): Promise<void> => {
    try {
      const words = await exercisesService.getLessonWords(req.params.lesson);
      // sends them as is if user is not logged in
      if (!req.user) {
        res.send(JSON.stringify({ words }));
        return;
      }

      // if the user is registered, get the wordStats for the words of this lesson
      const wordsStats = await statsService.findWordsStatsForWords(words);

      // appends the weakest forms for each word, or [] if the word has never been encountered
      const wordsWithWeakestFormsStats = appendWeakestForms(words, wordsStats);
      res.send(JSON.stringify({ words: wordsWithWeakestFormsStats }));
      logger.debug(
        `[getLesson] sent words for lesson ${req.params.lesson}, user ${
          req.user._id || "anonymous"
        }`
      );
    } catch (error) {
      logger.error(`[getLesson] error while fetching lesson data ${error}`);
    }
  },

  getWeakWords: async (req: Request, res: Response): Promise<void> => {
    try {
      // get words stats for a specific reference
      const wordsStats = await exercisesService.getWordsStats(
        req.params.reference,
        req.user._id
      );
      if (!wordsStats) {
        throw new Error(`No word stats found for user ${req.user._id}`);
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

      // returns an array of the 50 weakest words with their weakest forms
      res.send(JSON.stringify({ words: wordsWithWeakestFormsStats }));
    } catch (error) {
      logger.error(`[getWeakWord] cannot get weak words - ${error}`);
    }
  },

  getWordsToLearn: async (req: Request, res: Response): Promise<void> => {
    try {
      const words = await exercisesService.getLessonWords(req.params.lesson);
      res.send(JSON.stringify(words));
    } catch (error) {
      logger.error(
        "[getWordsToLearn] error while fetching words to learn",
        error
      );
    }
  },
};

export default exercisesController;
