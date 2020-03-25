import { Request, Response } from "express";
import getUpdatedLessonsStats from "./helpers/getUpdatedLessonsStats.function";
import getUpdatedTopicsStats from "./helpers/getUpdatedThemesStats.function";
import getUpdatedGlobalProgress from "./helpers/getUpdatedGlobalProgress.function";

const userStatsController = {
  getUpdatedUserStats: async (lessonsToUpdate, user) => {
    const updatedLessonsStats = await getUpdatedLessonsStats(
      lessonsToUpdate,
      user
    );
    const updatedThemesStats = getUpdatedTopicsStats(updatedLessonsStats);
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

    // TODO: return updated word stats, used to update user stats
    const lessonsToUpdate = await wordsController.upsertWordStats(
      exerciseResults,
      userId
    );
    const updatedUserStats = await userStatsController.getUpdatedUserStats(
      lessonsToUpdate,
      user
    );

    await userService.updateStats(user, updatedUserStats);
    res.status(200);
    res.send(updatedUserStats);
  },
};

export default userStatsController;
