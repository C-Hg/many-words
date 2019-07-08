import express from "express";
import bodyParser from "body-parser";
import getWordsToLearn from "../controllers/content_fetching/getWordsToLearn.controller";
import getLesson from "../controllers/content_fetching/getLesson.controller";
import createOrUpdateWordStats from "../controllers/progress_tracking/createOrUpdateWordStats.controller";
import prepareWeakWords from "../controllers/content_fetching/prepareWeakWords.controller";

const router = express.Router();

router.get("/learn/:lesson", getWordsToLearn);
router.get("/exercise/:lesson", getLesson);
router.get("/weak_words/:reference", prepareWeakWords);
router.post(
  "/stats/update_word_stats",
  bodyParser.json(),
  createOrUpdateWordStats
);

export default router;
