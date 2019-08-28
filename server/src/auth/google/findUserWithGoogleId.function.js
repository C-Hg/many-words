import User from "../../models/user.model";

const findUserWithGoogleId = async googleId => {
  let user;
  try {
    user = await User.findOne({ googleId });
  } catch (error) {
    console.error("[findUserWithGoogleId] error while checking db", error);
  }
  return user; // returns null if no match
};

export default findUserWithGoogleId;
