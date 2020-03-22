import { Request, Response } from "express";

import getWeakForms from "./helpers/getWeakForms.function";
import exercisesService from "./exercises.service";
import logger from "../logger";
import userStatsService from "../user/stats/userStats.service";
import sortWordStats from "./helpers/sortWordStats.function";

const exercisesController = {
  getLesson: async (req: Request, res: Response): Promise<void> => {
    let words;

    // fetches the words for the lesson
    try {
      words = await exercisesService.getLessonWords(req.params.lesson);
      // sends them as is if user is not logged in
      if (!req.user) {
        res.send(JSON.stringify({ words }));
        return;
      }
    } catch (error) {
      logger.error(`[getLesson] error while fetching lesson data ${error}`);
      return;
    }

    // if user is registered, selects the weakest forms
    // wordScores is a parallel array containing scores if they exist,
    // or "null", for each word
    try {
      const wordsStats = await Promise.all(
        words.map(async word => {
          const wordStats = await userStatsService.findWordStatsByEnglishReference(
            req.user._id,
            word.english.name
          );
          return wordStats;
        })
      );

      // gets the weakest forms of each word
      const weakestFormsStats = getWeakForms(wordsStats);
      res.send(JSON.stringify({ words, statsByForm: weakestFormsStats }));
      logger.debug(
        `[getLesson] sent words for lesson ${req.params.lesson}, user ${req.user
          ._id || "anonymous"}`
      );
    } catch (error) {
      logger.error(`[getLesson] error while preparing weak forms ${error}`);
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
        res.send(JSON.stringify(null));
      }

      // sort words stats and keep only the first 50
      const sortedWordsStats = sortWordStats(wordsStats);
      const slicedWordsStats = sortedWordsStats.slice(0, 50);

      // get the words corresponding to the 50 weakest words
      const words = await exercisesService.getWordsFromWordsStats(
        slicedWordsStats
      );

      // TODO: common function to do it with getLesson
      // filters out the stats of the weakest forms of each word
      const weakestFormsStats = getWeakForms(slicedWordsStats);

      // TODO: append weak forms directly to the word object, so that get WeakForms return Word[]
      // TODO: and not (FormStats[] | null)[]
      // returns an array of the 50 weakest words (words and weak forms)
      res.send(JSON.stringify({ words, statsByForm: weakestFormsStats }));
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
