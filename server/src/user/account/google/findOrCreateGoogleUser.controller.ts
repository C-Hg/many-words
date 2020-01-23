import UserDocument from "../../../models/user.interface";
import findUserWithGoogleEmail from "./findUserWithGoogleEmail.function";
import findUserWithGoogleId from "./findUserWithGoogleId.function";
import createUserWithGoogle from "./createUserWithGoogle.function";

const findOrCreateGoogleUser = async (
  googleId: string,
  email: string[]
): Promise<UserDocument> => {
  let user: UserDocument;

  if (email) {
    try {
      user = await findUserWithGoogleEmail(email);
    } catch (error) {
      console.error(
        "[findOrCreateGoogleUser] error while searching user with email",
        error
      );
    }
  }
  if (user) return user;

  // if no email is provided or no match found, searches the googleId
  try {
    user = await findUserWithGoogleId(googleId);
    if (user) return user;
  } catch (error) {
    console.error(
      "[findOrCreateGoogleUser] error while searching user with googleId",
      error
    );
  }

  // else creates new user (ignore typing as the api is gonna change soon)
  user = await createUserWithGoogle(googleId, email[0].value);
  return user;
};

export default findOrCreateGoogleUser;
