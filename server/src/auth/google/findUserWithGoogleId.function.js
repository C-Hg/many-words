import User from "../../models/user.model";

const findUserWithGoogleId = async googleId => {
  try {
    const user = await User.findOne({ googleId }, function handleSearch(error) {
      if (error) return handleError(error);
    });
    return user; // returns null if no match
  } catch (error) {
    console.error("error while checking db");
    return null;
  }
};

export default findUserWithGoogleId;
