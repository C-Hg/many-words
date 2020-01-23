import express from "express";
import bodyParser from "body-parser";
import getWordsToLearn from "../exercises/getWordsToLearn.controller";
import getLesson from "../exercises/getLesson.controller";
import prepareWeakWords from "../exercises/prepareWeakWords.controller";
import updateStats from "../user/stats/updateStats";

const router = express.Router();

router.get("/learn/:lesson", getWordsToLearn);
router.get("/exercise/:lesson", getLesson);
router.get("/weak_words/:reference", prepareWeakWords);
router.post("/stats/update_word_stats", bodyParser.json(), updateStats);

export default router;
