import User from "../../models/user.model";
import UserDocument from "../../interfaces/user.interface";
import logger from "../../../logger";

const findUserWithGoogleId = async (
  googleId: string
): Promise<UserDocument> => {
  let user;
  try {
    user = await User.findOne({ googleId });
  } catch (error) {
    logger.error("[findUserWithGoogleId] error while checking db", error);
  }
  return user; // returns null if no match
};

export default findUserWithGoogleId;
