const findWordStatsByLesson = require("./word_stats/findWordStatsByLesson.function");
const findLessonStats = require("./lesson_stats/findLessonStats.function");
const createUserStats = require("./user_stats/createUserStats.function");
const wordCountByLesson = require("../../exercises/FR-EN/wordCountByLesson");
const assessLessonStats = require("./lesson_stats/assessLessonStats.function");
const replaceUserStats = require("./user_stats/replaceUserStats.function");
const updateThemesStats = require("./updateThemesStats.controller");
const lessonHierarchy = require("../../exercises/FR-EN/lessons");

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
  let theme = wordStats[0].theme;

  // to calculate the lesson score
  newScore = assessLessonStats(wordStats, wordCountByLesson[lesson]);

  try {
    userStats = await findLessonStats(user);
  } catch (e) {
    console.log("error while fetching lesson stats");
  }

  // creates userStats for new user with lesson score
  if (!userStats) {
    let lessonsStats = {};
    lessonsStats[theme] = {};
    lessonsStats[theme][lesson] = newScore;
    userStats = { userId: user, lessonsStats: lessonsStats, themesStats: {} };
    await createUserStats(userStats);
  } else {
    // updates userStats otherwise
    // creates theme entry if necessary
    if (!userStats.lessonsStats[theme]) {
      userStats.lessonsStats[theme] = {};
    }
    userStats.lessonsStats[theme][lesson] = newScore;

    try {
      await replaceUserStats(userStats);
    } catch (e) {
      console.log("error while updating lesson stats");
    }
  }

  // finally, updates themes stats
  try {
    await updateThemesStats(userStats);
  } catch (e) {
    console.log("error while updating themes stats");
  }
};
