const express = require("express");
const router = express.Router();
const {
  getWordsToLearn
} = require("../controllers/getWordsToLearn.controller");
const { getLesson } = require("../controllers/getLesson.controller");

router.get("/learn/:lesson", getWordsToLearn);
router.get("/exercise/:lesson", getLesson);

module.exports = router;
