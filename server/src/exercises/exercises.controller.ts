import { Request, Response } from "express";

import getWeakForms from "./helpers/getWeakForms.function";
import exercisesService from "./exercises.service";
import logger from "../logger";
import userStatsService from "../user/stats/userStats.service";

const exercisesController = {
  getLesson: async (req: Request, res: Response): Promise<void> => {
    let words;

    // fetches the words for the lesson
    try {
      words = await exercisesService.getWordsForLesson(req.params.lesson);
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
        `[getLesson.controller] sent words for lesson ${
          req.params.lesson
        }, user ${req.user.id || "anonymous"}`
      );
    } catch (error) {
      logger.error(
        `[getLesson.controller] error while preparing weak forms ${error}`
      );
    }
  },
};

export default exercisesController;
