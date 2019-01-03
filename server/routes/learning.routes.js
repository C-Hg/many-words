const express = require("express");
const router = express.Router();
const {
  getWordsToLearn
} = require("../controllers/getWordsToLearn.controller");

router.get("/:lesson", getWordsToLearn);

module.exports = router;
