import { Request, Response } from "express";
import getUpdatedLessonsStats from "../exercises/lessons/getUpdatedLessonsStats.function";
import getUpdatedThemesStats from "./stats/themes/getUpdatedThemesStats.function";
import getUpdatedGlobalProgress from "./stats/global/getUpdatedGlobalProgress.function";
import wordsController from "../exercises/words/words.controller";
import userService from "./user.service";

const userController = {
  getUser: async (req: Request, res: Response): Promise<void> => {
    if (req.user) {
      res.status(200).send(req.user.stats);
    } else {
      res.status(200).send({ response: "user not connected" });
    }
  },

  getUpdatedUserStats: async (lessonsToUpdate, user) => {
    const updatedLessonsStats = await getUpdatedLessonsStats(
      lessonsToUpdate,
      user
    );
    const updatedThemesStats = getUpdatedThemesStats(updatedLessonsStats);
    const updatedGlobalProgress = await getUpdatedGlobalProgress(
      user,
      updatedLessonsStats,
      updatedThemesStats
    );
    const updatedUserStats = {
      ...user.stats,
      lessons: updatedLessonsStats,
      themes: updatedThemesStats,
      globalProgress: updatedGlobalProgress,
    };
    return updatedUserStats;
  },

  updateStats: async (req: Request, res: Response): Promise<void> => {
    console.debug(`[updateStats] updating stats for user ${req.user.id}`);
    const exerciseResults = req.body;
    const userId = req.user.id;
    const user = req.user.toObject();

    const lessonsToUpdate = await wordsController.upsertWordStats(
      exerciseResults,
      userId
    );
    const updatedUserStats = await userController.getUpdatedUserStats(
      lessonsToUpdate,
      user
    );

    await userService.updateStats(user, updatedUserStats);
    res.status(200);
    res.send(updatedUserStats);
  },
};

export default userController;
