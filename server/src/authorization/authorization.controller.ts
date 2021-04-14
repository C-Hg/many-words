import { Response } from "express";

import { CLIENTS } from "./constants";
import generateTotp from "./helpers/generateTotp";
import craftAccessToken from "./helpers/jwt/craftAccessToken";
import craftRefreshToken from "./helpers/jwt/craftRefreshToken";
import setAccessTokenCookie, { Cookies } from "./helpers/setAccessTokenCookie";
import setCookies from "./helpers/setCookies";
import { TokenPayload, TokenTypes } from "./interfaces/tokenPayload.interface";

import CONFIG from "../config/config";
import { Tokens, LoginInput, MutationResult } from "../graphql/types";
import userService from "../user/user.service";
import logger from "../utils/logger";

// TODO: refresh token rotation
const authorizationController = {
  /**
   * Returns a new access token, if the refresh token is valid
   */
  getAccessTokenWebUser: async (
    res: Response,
    refreshToken: TokenPayload
  ): Promise<void> => {
    logger.debug("[getAccessTokenWebUser] crafting a new access token");
    const { sub, tokenUse } = refreshToken;
    const user = await userService.getUserById(sub);
    if (!user) {
      res.clearCookie(Cookies.accessToken);
      res.clearCookie(Cookies.refreshToken);
      throw new Error("user does not exist, remove cookies");
    }
    if (tokenUse !== TokenTypes.refresh) {
      throw new Error("invalid token type");
    }
    const accessToken = await craftAccessToken(sub, CLIENTS.web);
    setAccessTokenCookie(res, accessToken);
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
   * Confirm the email with totp and returns access and refresh tokens in a cookie
   */
  logInWebUser: async (
    res: Response,
    loginInput: LoginInput
  ): Promise<MutationResult> => {
    const user = await userService.verifyNewUser(loginInput);
    const accessToken = await craftAccessToken(user.id, CLIENTS.web);
    const refreshToken = await craftRefreshToken(user.id);
    setCookies(res, accessToken, refreshToken);
    return { success: true };
  },

  // TODO: similar function for exercises Server to validate an email for a user
  // TODO: limit the number of requests from a single client
  /**
   * Generate and save the totp for later verification
   * Send it by email to the provided email
   */
  sendTotpToLogin: async (userId: string): Promise<MutationResult> => {
    logger.debug(`[sendTotpToLogin] trying to log in user ${userId}`);
    const totp = generateTotp();
    try {
      await userService.setTotpToLogin(totp, userId);
    } catch (error) {
      logger.error("[sendTotpToLogin] could not prepare totp");
      return { success: false };
    }

    if (CONFIG.env !== "production") {
      logger.info(`[sendTotp] login with totp ${totp.toString()}`);
    } else {
      // TODO: effectively send the email and catch errors
    }

    return { success: true };
  },

  /**
   * Generate and save the totp for later verification
   * Send it by email to the provided email
   */
  sendTotpToVerifyEmail: async (
    email: string,
    userId: string
  ): Promise<MutationResult> => {
    logger.debug(`[sendTotpToLogin] verifying email for user ${userId}`);
    const totp = generateTotp();
    // TODO: ensure email is not already taken
    try {
      await userService.setTotpToVerifyEmail(email, totp, userId);
    } catch (error) {
      logger.error("[sendTotpToLogin] could not send totp");
      return { success: false };
    }

    if (CONFIG.env !== "production") {
      logger.info(`[sendTotp] login with totp ${totp.toString()}`);
    } else {
      // TODO: effectively send the email and catch errors
    }

    return { success: true };
  },
};

export default authorizationController;
