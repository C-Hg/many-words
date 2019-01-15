const User = require("../../models/user.model");

module.exports = async function findUserWithGoogleId(googleId) {
  try {
    let user = await User.findOne({ googleId: googleId }, function handleSearch(
      err
    ) {
      if (err) return handleError(err);
    });
    return user; // returns null if no match
  } catch (e) {
    console.log("error while checking db");
    return;
  }
};
