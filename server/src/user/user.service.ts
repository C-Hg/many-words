import User from "./models/user.model";
import UserInterface from "./interfaces/user.interface";
import WordStats from "../exercises/models/words/wordStats.interface";

const userService = {
  updateStats: async (user: UserInterface, updatedUserStats: WordStats) => {
    try {
      await User.findByIdAndUpdate(user._id, { stats: updatedUserStats });
    } catch (error) {
      console.error("[updateUserStats] error while saving user stats", error);
      return error;
    }
    return true;
  },
};

export default userService;
