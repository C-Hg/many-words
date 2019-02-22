const UserStats = require("../../models/userStats.model");
const User = require("../../models/user.model");
const WordStats = require("../../models/wordStats.model");

module.exports = async function deleteUserAccount(userId) {
  try {
    await UserStats.deleteOne({ userId: userId });
  } catch (e) {
    console.log("error while removing userStats");
    return false;
  }
  try {
    await WordStats.deleteMany({ userId: userId });
  } catch (e) {
    console.log("error while removing wordStats");
    return false;
  }
  try {
    await User.deleteOne({ _id: userId });
  } catch (e) {
    console.log("error while removing user");
    return false;
  }

  return true;
};
