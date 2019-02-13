const UserStats = require("../../../models/userStats.model");

module.exports = async function replaceUserStats(userStats) {
  try {
    return await UserStats.replaceOne({ userId: userStats.userId }, userStats);
  } catch (e) {
    console.log("error while saving user stats!");
  }
};
