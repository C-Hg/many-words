const UserStats = require("../../../models/userStats.model");

module.exports = async function replaceLessonStats(user, userStats) {
  try {
    return await UserStats.replaceOne({ userId: user }, userStats);
  } catch (e) {
    console.log("error while saving lesson stats!");
  }
};
