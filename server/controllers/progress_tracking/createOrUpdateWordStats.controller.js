const getWordStats = require("./getWordStats.controller");
const updateWordStats = require("./word_stats/updateWordStats.function");
const updateLessonStats = require("./updateLessonStats.controller");
const updateThemesStats = require("./updateThemesStats.controller");
const replaceUserStats = require("./user_stats/replaceUserStats.function");

module.exports = async function createOrUpdateWordStats(req, res) {
  // data received in an array of arrays :
  // [ [en_name of the word, source_language, form name, answered correctly?], [...], ... ]

  let exerciseResults = req.body;
  let user_id = req.user._id;
  let lessons = [];

  //iterating each word studied
  for (let word of exerciseResults) {
    let wordStats;
    try {
      wordStats = await getWordStats(word[0], user_id);
    } catch (e) {
      console.log("error while fetching or creating word stats");
    }

    try {
      await updateWordStats(wordStats, word);
    } catch (e) {
      console.log("error while updating word stats");
    }

    //gather lessons to update
    if (!lessons.includes(wordStats.lesson)) {
      lessons.push(wordStats.lesson);
    }
  }

  // TO BE GATHERED in a controller ??? assess if parallel runs are possible
  let user = req.user.toObject();
  for (let lesson of lessons) {
    try {
      user = await updateLessonStats(user, lesson);
    } catch (e) {
      console.log("error while updating lesson stats");
    }
  }

  try {
    user = await updateThemesStats(user);
  } catch (e) {
    console.log("error while updating themes stats");
  }

  try {
    user = await updateGlobalProgress(user);
  } catch (e) {
    console.log("error while updating themes stats");
  }

  // only one writing operation to the db
  try {
    await replaceUserStats(user);
  } catch (e) {
    console.log("error while replacing theme stats");
  }

  res.send(user);
};
