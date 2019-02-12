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
const getWordStatsCount = require("../controllers/progress_tracking/word_stats/getWordStatsCount.function");
const getThemesStats = require("../controllers/progress_tracking/getThemesStats.controller");

router.get("/learn/:lesson", getWordsToLearn);
router.get("/exercise/:lesson", getLesson);
router.get("/tracking/word_count", getWordStatsCount);
router.get("/tracking/themes_stats", getThemesStats);

router.post(
  "/tracking/update_word_stats",
  bodyParser.json(),
  createOrUpdateWordStats
);

module.exports = router;
