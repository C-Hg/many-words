const findWordStatsByLesson = require("./word_stats/findWordStatsByLesson.function");
const getLessonStats = require("./getLessonStats.controller");
const wordCountByLesson = require("../../exercises/FR-EN/wordCountByLesson");
const assessLessonStats = require("./lesson_stats/assessLessonStats.function");
const updateLessonStats = require("./lesson_stats/updateLessonStats.function");

module.exports = async function createOrUpdateLessonStats(user, lesson) {
  let wordProficiencies;
  let userStats;
  let newScore;

  //gather each word stats of the lesson
  try {
    wordProficiencies = await findWordStatsByLesson(user, lesson);
  } catch (e) {
    console.log("error while fetching or creating word stats");
  }

  newScore = assessLessonStats(wordProficiencies, wordCountByLesson[lesson]);

  try {
    userStats = await getLessonStats(user);
  } catch (e) {
    console.log("error while fetching lesson stats");
  }

  // modifies the user stats for the given lesson ...
  if (!userStats.lessonStats) {
    userStats.lessonStats = {};
  }
  userStats.lessonStats[lesson] = newScore;

  //... and saves it
  try {
    await updateLessonStats(userStats);
  } catch (e) {
    console.log("error while updating lesson stats");
  }
};
