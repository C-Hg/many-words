const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const {
  getWordsToLearn
} = require("../controllers/content_fetching/getWordsToLearn.controller");
const {
  getLesson
} = require("../controllers/content_fetching/getLesson.controller");
const createOrUpdateWordProficiency = require("../controllers/progress_tracking/createOrUpdateWordProficiency.controller");
const getWordCount = require("../controllers/progress_tracking/getWordCount.controller");

router.get("/learn/:lesson", getWordsToLearn);
router.get("/exercise/:lesson", getLesson);
router.get("/tracking/word_count", getWordCount);

router.post(
  "/tracking/update_word_stats",
  bodyParser.json(),
  createOrUpdateWordProficiency
);

module.exports = router;
