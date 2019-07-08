import User from "../../../models/user.model";

const replaceUserStats = async user => {
  try {
    return await User.replaceOne({ _id: user._id }, user);
  } catch (e) {
    console.log("error while saving user stats!");
  }
};

export default replaceUserStats;
