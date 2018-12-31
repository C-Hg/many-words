const express = require("express");
const router = express.Router();
const { getLesson } = require("../controllers/getLesson.controller");

router.get("/:lesson", getLesson);

module.exports = router;
