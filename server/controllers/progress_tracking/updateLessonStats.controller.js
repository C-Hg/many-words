const findWordStatsByLesson = require("./word_stats/findWordStatsByLesson.function");
const wordCountByLesson = require("../../exercises/FR-EN/wordCountByLesson");
const assessLessonStats = require("./lesson_stats/assessLessonStats.function");
const replaceUserStats = require("./user_stats/replaceUserStats.function");
const updateThemesStats = require("./updateThemesStats.controller");

module.exports = async function updateLessonStats(user, lesson) {
  let wordStats;
  let newScore;

  //gather word stats of the given lesson
  try {
    wordStats = await findWordStatsByLesson(user._id, lesson);
  } catch (e) {
    console.log("error while fetching or creating word stats");
  }
  let theme = wordStats[0].theme;

  // to calculate the lesson score
  newScore = assessLessonStats(wordStats, wordCountByLesson[lesson]);

  // creates theme entry if necessary
  if (!user.lessonsStats[theme]) {
    user.lessonsStats[theme] = {};
  }
  user.lessonsStats[theme][lesson] = newScore;

  // pass data to update theme stats, thus writing only once in the dbfinally, updates themes stats
  try {
    await updateThemesStats(user);
  } catch (e) {
    console.log("error while updating themes stats");
  }
};
