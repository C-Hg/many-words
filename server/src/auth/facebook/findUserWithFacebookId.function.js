const User = require("../../models/user.model");

module.exports = async function findUserWithFacebookId(facebookId) {
  try {
    let user = await User.findOne(
      { facebookId: facebookId },
      function handleSearch(err) {
        if (err) return handleError(err);
      }
    );
    return user; // returns null if no match
  } catch (e) {
    console.log("error while searching user with facebook id");
    return;
  }
};
