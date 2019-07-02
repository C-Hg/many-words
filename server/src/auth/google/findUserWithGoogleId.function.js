import User from "../../models/user.model";

const findUserWithGoogleId = async googleId => {
  try {
    const user = await User.findOne({ googleId }, function handleSearch(err) {
      if (err) return handleError(err);
    });
    return user; // returns null if no match
  } catch (e) {
    console.log("error while checking db");
  }
};

export default findUserWithGoogleId;
