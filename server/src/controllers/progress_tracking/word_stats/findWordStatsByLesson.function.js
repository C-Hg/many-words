const WordStats = require("../../../models/wordStats.model");

module.exports = async function findWordStatsByLesson(user, lesson) {
  try {
    return await WordStats.find({ userId: user, lesson: lesson });
  } catch (e) {
    console.log("error while searching word stats by lesson");
  }
};
