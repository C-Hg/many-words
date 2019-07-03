const getWordStats = require("./getWordStats.controller");
const updateWordStats = require("./word_stats/updateWordStats.function");
const updateLessonStats = require("./updateLessonStats.controller");
const updateThemesStats = require("./updateThemesStats.controller");
const updateGlobalProgress = require("./updateGlobalProgress.controller");
const calculateLessonsStats = require("./global_progress/assessGlobalLessonsStats.function");
const replaceUserStats = require("./user_stats/replaceUserStats.function");

module.exports = async function createOrUpdateWordStats(req, res) {
  // data received in an array of arrays :
  // [ [en_name of the word, source_language, form name, answered correctly?], [...], ... ]

  const exerciseResults = req.body;
  const user_id = req.user._id;
  const lessons = [];

  // iterating each word studied
  for (const word of exerciseResults) {
    let wordStats;
    try {
      wordStats = await getWordStats(word[0], user_id);
    } catch (e) {
      console.log("error while fetching or creating word stats", e);
    }

    try {
      await updateWordStats(wordStats, word);
    } catch (e) {
      console.log("error while updating word stats", e);
    }

    // gather lessons to update
    if (!lessons.includes(wordStats.lesson)) {
      lessons.push(wordStats.lesson);
    }
  }

  // TO BE GATHERED AND OPTIMIZED in a controller ??? assess if parallel runs are possible
  // delete useless try/catch
  let user = req.user.toObject();
  for (const lesson of lessons) {
    try {
      user = await updateLessonStats(user, lesson);
    } catch (e) {
      console.log("error while updating lesson stats", e);
    }
  }

  try {
    user = await updateThemesStats(user);
  } catch (e) {
    console.log("error while updating themes stats", e);
  }

  try {
    user = await updateGlobalProgress(user);
  } catch (e) {
    console.log("error while updating global stats", e);
  }

  // only one writing operation to the db
  try {
    await replaceUserStats(user);
  } catch (e) {
    console.log("error while replacing user stats", e);
  }

  res.send(user.stats);
};
