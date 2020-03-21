import { Request, Response } from "express";
import getUpdatedLessonsStats from "../exercises/lessons/getUpdatedLessonsStats.function";
import getUpdatedThemesStats from "./stats/topics/getUpdatedThemesStats.function";
import getUpdatedGlobalProgress from "./stats/global/getUpdatedGlobalProgress.function";
import wordsController from "../exercises/words/words.controller";
import userService from "./user.service";

const userController = {
  getUser: (req: Request, res: Response): void => {
    if (req.user) {
      res.status(200).send(req.user.stats);
    } else {
      res.status(200).send({ response: "user not connected" });
    }
  },
};

export default userController;
