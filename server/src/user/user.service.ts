import User from "./models/user.model";
import UserInterface from "./interfaces/user.interface";
import WordStats from "./stats/interfaces/wordStats.interface";

const userService = {
  updateStats: async (
    user: UserInterface,
    updatedUserStats: WordStats
  ): Promise<void> => {
    try {
      await User.findByIdAndUpdate(user._id, { stats: updatedUserStats });
      // TODO: throw error
    } catch (error) {
      console.error("[updateUserStats] error while saving user stats", error);
    }
  },
};

export default userService;
