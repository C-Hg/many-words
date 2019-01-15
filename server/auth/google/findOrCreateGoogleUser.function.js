const findUserWithEmail = require("../common/findUserWithEmail.function");
const findUserWithGoogleId = require("./findUserWithGoogleId.function");
const createUserWithGoogle = require("./createUserWithGoogle.function");

module.exports = async function findOrCreateGoogleUser(googleId, email = "") {
  let user = "";

  // searches the user with email (thus a chance to find same user with different social providers)
  // careful : google sends an array of email adresses of the form :
  // [{ value: email@adress }]
  if (email) {
    if (typeof email === "object") {
      for (let count = 0; count < email.length; count++) {
        try {
          user = await findUserWithEmail(email[count].value);
          if (user) break;
        } catch (e) {
          console.log("error while searching user with email");
        }
      }
    }
  }
  if (user) return user;

  // if no email is provided or no match found, searches the googleId
  try {
    user = await findUserWithGoogleId(googleId);
    if (user) return user;
  } catch (e) {
    console.log("error while searching user with googleId");
  }

  // else creates new user
  user = await createUserWithGoogle(googleId, email[0].value);
  return user;
};
