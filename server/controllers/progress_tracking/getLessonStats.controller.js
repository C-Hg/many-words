const findLessonStats = require("./lesson_stats/findLessonStats.function");
const createUserStats = require("./user_stats/createUserStats.function");

module.exports = async function getLessonStats(user) {
  let lessonStats;
  try {
    lessonStats = await findLessonStats(user);
  } catch (e) {
    console.log("error while fetching lesson stats");
  }
  if (lessonStats) {
    return lessonStats;
  }

  lessonStats = createUserStats(user);
  return lessonStats;
};
