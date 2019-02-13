const getWordStats = require("./getWordStats.controller");
const updateWordStats = require("./word_stats/updateWordStats.function");
const createOrReplaceLessonStats = require("./createOrReplaceLessonStats.controller");

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

  for (let lesson of lessons) {
    try {
      createOrReplaceLessonStats(user_id, lesson);
    } catch (e) {
      console.log("error while updating lesson stats");
    }
  }

  res.send("all good");
};
