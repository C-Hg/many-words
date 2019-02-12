const UserStats = require("../../../models/userStats.model");

module.exports = async function findLessonStats(user) {
  try {
    return await UserStats.findOne({ userId: user }, "lessonStats");
  } catch (e) {
    console.log("error while searching word stats by lesson");
  }
};
