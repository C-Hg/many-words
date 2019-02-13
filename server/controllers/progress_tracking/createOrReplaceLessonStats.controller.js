const findWordStatsByLesson = require("./word_stats/findWordStatsByLesson.function");
const findLessonStats = require("./lesson_stats/findLessonStats.function");
const createUserStats = require("./user_stats/createUserStats.function");
const wordCountByLesson = require("../../exercises/FR-EN/wordCountByLesson");
const assessLessonStats = require("./lesson_stats/assessLessonStats.function");
const replaceLessonStats = require("./lesson_stats/replaceLessonStats.function");

module.exports = async function createOrReplaceLessonStats(user, lesson) {
  let wordStats;
  let userStats;
  let newScore;

  //gather word stats of the given lesson
  try {
    wordStats = await findWordStatsByLesson(user, lesson);
  } catch (e) {
    console.log("error while fetching or creating word stats");
  }
  // to calculate the lesson score
  newScore = assessLessonStats(wordStats, wordCountByLesson[lesson]);

  try {
    userStats = await findLessonStats(user);
  } catch (e) {
    console.log("error while fetching lesson stats");
  }
  // creates userStats for new user with lesson score
  if (!userStats) {
    let lessonStats = {};
    lessonStats[lesson] = newScore;
    let userData = { userId: user, lessonStats: lessonStats };
    await createUserStats(userData);
    return;
  } else {
    // updates userStats otherwise
    userStats.lessonStats[lesson] = newScore;
    try {
      await replaceLessonStats(user, userStats);
    } catch (e) {
      console.log("error while updating lesson stats");
    }
  }
};
