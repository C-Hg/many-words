const findUserWithEmail = require("../common/findUserWithEmail.function");
const findUserWithFacebookId = require("./findUserWithFacebookId.function");
const createUserWithFacebook = require("./createUserWithFacebook.function");

module.exports = async function findOrCreateFacebookUser(facebookId, email) {
  let user = "";

  // searches user with email, allows cross auth with several providers
  if (email[0].value) {
    try {
      user = await findUserWithEmail(email);
    } catch (e) {
      console.log("error while searching user with email");
    }
  }
  if (user) return user;

  // if no email is provided or no match found, searches the facebookId
  try {
    user = await findUserWithFacebookId(facebookId);
    if (user) return user;
  } catch (e) {
    console.log("error while searching user with facebookId");
  }

  // else creates new user
  user = await createUserWithFacebook(facebookId, email);
  return user;
};
