const UserStats = require("../../../models/userStats.model");

module.exports = function createUserStats(user) {
  return new UserStats({
    userId: user
  });
};
