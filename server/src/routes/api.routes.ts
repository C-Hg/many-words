import bodyParser from "body-parser";
import express from "express";

import exercisesController from "../exercises/exercises.controller";
import statsController from "../stats/stats.controller";

const router = express.Router();

router.get("/learn/:lesson", exercisesController.getWordsToLearn);
router.get("/exercise/:lesson", exercisesController.getLesson);
router.get("/weak_words/:reference", exercisesController.getWeakWords);
router.post(
  "/stats/update_word_stats",
  bodyParser.json(),
  statsController.updateStats
);

export default router;
