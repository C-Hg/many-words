import User from "../../models/user.model";

const createUserWithGoogle = async (googleId, email) => {
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
