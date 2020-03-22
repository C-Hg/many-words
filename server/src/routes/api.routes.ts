import express from "express";
import bodyParser from "body-parser";

import updateWordStats from "../user/stats/words/helpers/updateWordStats.function";
import exercisesController from "../exercises/exercises.controller";

const router = express.Router();

router.get("/learn/:lesson", exercisesController.getWordsToLearn);
router.get("/exercise/:lesson", exercisesController.getLesson);
router.get("/weak_words/:reference", exercisesController.getWeakWords);
router.post("/stats/update_word_stats", bodyParser.json(), updateWordStats);

export default router;
