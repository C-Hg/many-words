import { TOTP_EXPIRATION } from "./constants";
import { UserDocument, User } from "./interfaces/user.interface";
import UserModel from "./models/user.model";

import generateTotp from "../authorization/helpers/generateTotp";
import { Languages, LoginInput } from "../graphql/types";
import logger from "../utils/logger";

const userService = {
  /**
   * Create a new user, id is generated by mongo
   */
  createUser: async (user: Partial<User> = {}): Promise<UserDocument> => {
    const newUser = await UserModel.create(user);
    logger.info(`[createUser] created user ${newUser.id}`);
    return newUser;
  },

  /**
   * Get user by id
   */
  getUserById: async (userId: string): Promise<UserDocument | null> => {
    return UserModel.findById(userId);
  },

  /**
   * Sets the preferred language
   */
  setLanguage: async (
    userId: string,
    language: Languages
  ): Promise<UserDocument> => {
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { language },
      { new: true }
    );
    if (!user) {
      throw new Error(`user does not exist`);
    }
    return user;
  },

  /**
   * Updates a user with login details to log in with totp
   */
  setTotpToLogin: async (totp: number, userId: string): Promise<void> => {
    logger.debug(`[setTotp] set new totp`);
    const login = {
      totp,
      expiresAt: Date.now() + TOTP_EXPIRATION,
    };
    await UserModel.findByIdAndUpdate(
      userId,
      { login },
      {
        new: true,
      }
    );
  },

  /**
   * Updates a user with login details to log in with totp
   */
  setTotpToVerifyEmail: async (
    email: string,
    totp: number,
    userId: string
  ): Promise<void> => {
    logger.debug(`[setTotp] set new totp`);
    const login = {
      totp,
      expiresAt: Date.now() + TOTP_EXPIRATION,
      emailToConfirm: email,
    };
    await UserModel.findByIdAndUpdate(userId, { login });
  },

  /**
   * Verify that the totp provided is valid, to confirm the email
   */
  verifyNewUser: async (loginInput: LoginInput): Promise<UserDocument> => {
    const { email, totp } = loginInput;
    const user = await UserModel.findOne({ email });
    if (user === null) {
      logger.error("[verifyNewUser] no user matched the given email");
      throw new Error("RequestFailed");
    }
    const storedTotp = user?.login?.totp;
    if (!storedTotp) {
      logger.error("[verifyNewUser] trying to verify a user without totp");
      throw new Error("RequestFailed");
    }
    if (totp !== user?.login?.totp) {
      logger.error("[verifyNewUser] wrong totp");
      throw new Error("WrongTotp");
    }
    const expiresAt = user?.login?.expiresAt;
    if (!expiresAt || expiresAt < Date.now()) {
      logger.error("[verifyNewUser] expired totp");
      throw new Error("ExpiredTotp");
    }
    logger.info(`[verifyNewUser] successfully verified new user ${user.id}`);
    return user;
  },
};

export default userService;
