import express from "express";
import bodyParser from "body-parser";
import getWordsToLearn from "../controllers/content_fetching/getWordsToLearn.controller";
import getLesson from "../controllers/content_fetching/getLesson.controller";
import prepareWeakWords from "../controllers/content_fetching/prepareWeakWords.controller";
import updateStats from "../controllers/progress_tracking/updateStats";

const router = express.Router();

router.get("/learn/:lesson", getWordsToLearn);
router.get("/exercise/:lesson", getLesson);
router.get("/weak_words/:reference", prepareWeakWords);
router.post("/stats/update_word_stats", bodyParser.json(), updateStats);

export default router;
