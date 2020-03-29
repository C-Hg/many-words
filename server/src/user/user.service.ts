import { UserDocument } from "./interfaces/user.interface";
import User from "./models/user.model";

import { WordStats } from "../stats/interfaces/wordStats.interface";

const userService = {
  updateStats: async (
    user: UserDocument,
    updatedUserStats: WordStats
  ): Promise<UserDocument | null> => {
    return User.findByIdAndUpdate(user._id, { stats: updatedUserStats });
  },
};

export default userService;
