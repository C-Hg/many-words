import findUserWithEmail from "../common/findUserWithEmail.function";
import findUserWithGoogleId from "./findUserWithGoogleId.function";
import createUserWithGoogle from "./createUserWithGoogle.function";

const findOrCreateGoogleUser = async (googleId, email) => {
  let user = "";

  // searches user with email, allows cross auth with several providers
  // see findUserWithEmail.function for details
  if (email) {
    try {
      user = await findUserWithEmail(email);
    } catch (error) {
      console.error("error while searching user with email", error);
    }
  }
  if (user) return user;

  // if no email is provided or no match found, searches the googleId
  try {
    user = await findUserWithGoogleId(googleId);
    if (user) return user;
  } catch (error) {
    console.error("error while searching user with googleId", error);
  }

  // else creates new user
  user = await createUserWithGoogle(googleId, email[0].value);
  return user;
};

export default findOrCreateGoogleUser;
