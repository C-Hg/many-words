const User = require("../../models/user.model");

module.exports = async function findUserWithEmail(email) {
  try {
    let user = await User.findOne({ email: email }, function handleSearch(err) {
      if (err) console.log(err);
    });
    return user; // returns null if no match
  } catch (e) {
    console.log("error while checking db");
    return;
  }
};
