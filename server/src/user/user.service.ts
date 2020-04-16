import { UserDocument } from "./interfaces/user.interface";
import User from "./models/user.model";

const userService = {
  getUserById: async (userId: string): Promise<UserDocument> => {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error(`[getUserById] no user found with id ${userId}`);
    }
    return user;
  },
};

export default userService;
