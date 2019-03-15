const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const {
  getWordsToLearn
} = require("../controllers/content_fetching/getWordsToLearn.controller");
const {
  getLesson
} = require("../controllers/content_fetching/getLesson.controller");
const createOrUpdateWordStats = require("../controllers/progress_tracking/createOrUpdateWordStats.controller");
const prepareWeakWords = require("../controllers/content_fetching/prepareWeakWords.controller");

router.get("/learn/:lesson", getWordsToLearn);
router.get("/exercise/:lesson", getLesson);
router.get(
  ["/weak_words/:context", "/weak_words/:context/:reference"],
  prepareWeakWords
);

router.post(
  "/tracking/update_word_stats",
  bodyParser.json(),
  createOrUpdateWordStats
);

module.exports = router;
