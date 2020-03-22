import UserDocument from "../../interfaces/user.interface";
import User from "../../models/user.model";
import logger from "../../../logger";

const createUserWithGoogle = async (
  googleId: string,
  email: string
): Promise<UserDocument> => {
  let user;
  try {
    user = await User.create({ googleId, email });
    logger.info(`[createUserWithGoogle] created user ${user.id}`);
  } catch (error) {
    logger.error("[createUserWithGoogle] error while registering user", error);
  }
  return user;
};

export default createUserWithGoogle;
