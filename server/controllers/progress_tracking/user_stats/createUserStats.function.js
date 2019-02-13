const UserStats = require("../../../models/userStats.model");

module.exports = async function createUserStats(userData) {
  let userStats = new UserStats(userData);
  return await userStats.save();
};
