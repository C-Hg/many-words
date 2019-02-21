const UserStats = require("../../models/userStats.model");
const User = require("../../models/user.model");
const WordStats = require("../../models/wordStats.model");

module.exports = async function deleteUserAccount(userId) {
  console.log("userId: ", userId);
  let result = await User.findOne({ id: userId });
  console.log(result);
  try {
    let deleteUserStats = await UserStats.deleteOne({ userId: userId });
    console.log("deleteUserStats", deleteUserStats);
  } catch (e) {
    console.log("error while removing userStats");
  }
  try {
    let deleteWordStats = await WordStats.deleteMany({ userId: userId });
    console.log("deleteWordStats", deleteWordStats);
  } catch (e) {
    console.log("error while removing wordStats");
  }
  try {
    let deleteUser = await User.deleteOne({ _id: userId });
    console.log("deleteUser", deleteUser);
  } catch (e) {
    console.log("error while removing user");
  }

  return true;
};
