/* eslint-disable no-underscore-dangle */
import User from "../../../models/user.model";

const updateUserStats = async (user, updatedUserStats) => {
  try {
    await User.findByIdAndUpdate(user._id, { stats: updatedUserStats });
  } catch (error) {
    console.error("[updateUserStats] error while saving user stats", error);
    return error;
  }
  return true;
};

export default updateUserStats;
