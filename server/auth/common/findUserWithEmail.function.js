const User = require("../../models/user.model");

// searches a match with every emails sent, if any
// Google and Facebook use the same format : array of email adresses of the form :
// [{ value: email@adress }]

module.exports = async function findUserWithEmail(email) {
  let user;
  for (let count = 0; count < email.length; count++) {
    try {
      user = await User.findOne(
        { email: email[count].value },
        function handleSearch(err) {
          if (err) console.log(err);
        }
      );
    } catch (e) {
      console.log("error while checking db");
      return;
    }
  }
  return user; // returns null if no match
};
