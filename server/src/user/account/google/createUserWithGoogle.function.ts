import UserDocument from "../../../models/user.interface";
import User from "../../../models/user.model";

const createUserWithGoogle = async (
  googleId: string,
  email: string
): Promise<UserDocument> => {
  let user;
  try {
    user = await User.create({ googleId, email });
    console.info(`[createUserWithGoogle] created user ${user.id}`);
  } catch (error) {
    console.error("[createUserWithGoogle] error while registering user", error);
  }
  return user;
};

export default createUserWithGoogle;
