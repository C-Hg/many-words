import User from "../../../models/user.model";
import UserDocument from "../../../models/user.interface";

const findUserWithGoogleId = async (
  googleId: string
): Promise<UserDocument> => {
  let user;
  try {
    user = await User.findOne({ googleId });
  } catch (error) {
    console.error("[findUserWithGoogleId] error while checking db", error);
  }
  return user; // returns null if no match
};

export default findUserWithGoogleId;
