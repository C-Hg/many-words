import { AuthenticationError } from "apollo-server-express";
import { Response } from "express";

import { CLIENTS } from "./constants";
import generateTotp from "./helpers/generateTotp";
import craftAccessToken from "./helpers/jwt/craftAccessToken";
import craftRefreshToken from "./helpers/jwt/craftRefreshToken";
import verifyToken from "./helpers/jwt/verifyToken";
import setAccessCookie from "./helpers/setAccessCookie";
import { TokenTypes } from "./interfaces/tokenPayload.interface";

import CONFIG from "../config/config";
import {
  Tokens,
  LoginInput,
  MutationResult,
} from "../graphql/authorization.types";
import userService from "../user/user.service";
import logger from "../utils/logger";

// TODO: refresh token rotation
const authorizationController = {
  /**
   * Creates a new user for a mobile device
   * Tokens are stored securely with keyChain
   */
  createAppUser: async (): Promise<Tokens> => {
    logger.debug("[createUser] crafting tokens for a new mobile user");
    const newUser = await userService.createUser();
    const [accessToken, refreshToken] = await Promise.all([
      craftAccessToken(newUser.id, CLIENTS.app),
      craftRefreshToken(newUser.id),
    ]);
    return { accessToken, refreshToken };
  },

  /**
   * Creates a new user for the website
   * Tokens are stored securely inside cookies
   * If we had sensitive data we would add xsrf protection
   */
  createWebUser: async (res: Response): Promise<MutationResult> => {
    logger.debug("[createUser] crafting tokens for a new website user");
    const newUser = await userService.createUser();
    const accessToken = await craftAccessToken(newUser.id, CLIENTS.web);
    setAccessCookie(res, accessToken);
    return { success: true };
  },

  /**
   * Returns a new access token, if the refresh token is valid
   */
  getAccessToken: async (refreshToken: string): Promise<string> => {
    logger.debug("[getAccessToken] crafting a new access token");
    try {
      const verifiedRefreshToken = await verifyToken(refreshToken);
      const { sub, tokenUse } = verifiedRefreshToken;
      if (tokenUse !== TokenTypes.refresh) {
        logger.error("[getAccessToken] invalid token type");
        throw new AuthenticationError("InvalidToken");
      }
      return craftAccessToken(sub, CLIENTS.app);
    } catch (error) {
      // Errors while verifying the token will be caught here: expired token, wrong signature
      // The user must login
      logger.error(`[getAccessToken] ${error}`);
      throw new AuthenticationError("InvalidToken");
    }
  },

  /**
   * Confirm the email with totp and returns tokens
   */
  logInAppUser: async (loginInput: LoginInput): Promise<Tokens> => {
    const user = await userService.verifyNewUser(loginInput);
    const [accessToken, refreshToken] = await Promise.all([
      craftAccessToken(user.id, CLIENTS.app),
      craftRefreshToken(user.id),
    ]);
    return { accessToken, refreshToken };
  },

  /**
   * Confirm the email with totp and returns access token in a cookie
   */
  logInWebUser: async (
    res: Response,
    loginInput: LoginInput
  ): Promise<MutationResult> => {
    const user = await userService.verifyNewUser(loginInput);
    const accessToken = await craftAccessToken(user.id, CLIENTS.web);
    setAccessCookie(res, accessToken);
    return { success: true };
  },

  // TODO: similar function for exercises Server to validate an email for a user
  // TODO: limit the number of requests from a single client
  /**
   * Generate and save the totp for later verification
   * Send it by email to the provided email
   */
  sendTotp: async (email: string): Promise<MutationResult> => {
    logger.debug("[sendTotp] trying to log in user with email");
    const totp = generateTotp();
    await userService.setTotp(email, totp);

    if (CONFIG.env !== "production") {
      logger.info(`[sendTotp] login with totp ${totp.toString()}`);
    } else {
      // TODO: effectively send the email and catch errors
    }

    return { success: true };
  },
};

export default authorizationController;
