import { UserDocument } from "./interfaces/user.interface";
import User from "./models/user.model";

import logger from "../logger";

const userService = {
  /**
   * Get user by id
   */
  getUserById: async (userId: string): Promise<UserDocument> => {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error(`[getUserById] no user found with id ${userId}`);
    }
    return user;
  },

  /**
   * Create a new user with a random id
   */
  createUser: async (): Promise<UserDocument> => {
    const user = await User.create();
    logger.info(`[createUser] created user ${user._id}`);
    return user;
  },
};

export default userService;
