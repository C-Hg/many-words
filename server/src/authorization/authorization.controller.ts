import { Response } from "express";
import validator from "validator";

import {
  REFRESH_TOKEN_EXPIRATION,
  WEB_ACCESS_TOKEN_EXPIRATION,
  CLIENTS,
} from "./constants";
import generateTotp from "./helpers/generateTotp";
import craftAccessToken from "./helpers/jwt/craftAccessToken";
import signToken from "./helpers/jwt/signToken";
import verifyToken from "./helpers/jwt/verifyToken";
import { TokenTypes } from "./interfaces/tokenPayload.interface";

import CONFIG from "../config/config";
import { Tokens, Result, LoginInput } from "../graphql/authorization.types";
import userService from "../user/user.service";
import logger from "../utils/logger";

// TODO: refresh token rotation
const authorizationController = {
  /**
   * Confirm the email with totp and returns tokens
   */
  loginAppUser: async (loginInput: LoginInput): Promise<Tokens> => {
    const user = await userService.verifyNewUser(loginInput);
    const [accessToken, refreshToken] = await Promise.all([
      craftAccessToken(user.id, CLIENTS.app),
      authorizationController.craftRefreshToken(user.id),
    ]);
    return { accessToken, refreshToken };
  },

  /**
   * Confirm the email with totp and returns access token in a cookie
   */
  loginWebUser: async (loginInput: LoginInput): Promise<Result> => {
    const user = await userService.verifyNewUser(loginInput);
    // TODO: extract cookie function
    return { success: true };
  },

  // TODO: move to helpers
  craftRefreshToken: async (id: string): Promise<string> => {
    const exp = Math.floor(Date.now() / 1000) + REFRESH_TOKEN_EXPIRATION;
    const payload = {
      exp,
      sub: id,
      tokenUse: TokenTypes.refresh,
    };
    return signToken(payload);
  },

  /**
   * Creates a new user for a mobile device
   * Tokens are stored securely with keyChain
   */
  createAppUser: async (): Promise<Tokens> => {
    logger.debug("[createUser] crafting tokens for a new mobile user");
    const newUser = await userService.createUser();
    const [accessToken, refreshToken] = await Promise.all([
      craftAccessToken(newUser.id, CLIENTS.app),
      authorizationController.craftRefreshToken(newUser.id),
    ]);
    return { accessToken, refreshToken };
  },

  /**
   * Creates a new user for the website
   * Tokens are stored securely inside cookies
   */
  createWebUser: async (res: Response): Promise<Result> => {
    logger.debug("[createUser] crafting tokens for a new website user");
    const newUser = await userService.createUser();
    const accessToken = await craftAccessToken(newUser.id, CLIENTS.web);
    // if we had sensitive data we would add xsrf protection
    // TODO: get cookie helper function
    res.cookie("access_token", accessToken, {
      expires: new Date(Date.now() + WEB_ACCESS_TOKEN_EXPIRATION), // cookie will be removed after 6 months
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // TODO: check if it works on staging server
    });
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
        throw new Error("InvalidToken");
      }
      return craftAccessToken(sub, CLIENTS.app);
    } catch (error) {
      // Errors while verifying the token will be caught here: expired token, wrong signature
      // The user must login
      logger.error(`[getAccessToken] ${error}`);
      throw new Error("InvalidToken");
    }
  },

  // TODO: similar function for exercises Server to validate an email for a user
  // TODO: limit the number of requests from a single client
  sendTotp: async (email: string): Promise<Result> => {
    logger.debug("[sendTotp] trying to login user with email");
    if (!validator.isEmail(email)) {
      logger.error("[sendTotp] invalid email format");
      throw new Error("Invalid email format");
    }

    // generate and save the totp for later verification
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
