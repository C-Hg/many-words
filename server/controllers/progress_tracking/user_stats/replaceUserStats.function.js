const User = require("../../../models/user.model");

module.exports = async function replaceUserStats(user) {
  try {
    return await User.replaceOne({ _id: user._id }, user);
  } catch (e) {
    console.log("error while saving user stats!");
  }
};
