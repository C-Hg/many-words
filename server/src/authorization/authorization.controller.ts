import validator from "validator";

import { ACCESS_TOKEN_EXPIRATION, REFRESH_TOKEN_EXPIRATION } from "./constants";
import generateTotp from "./helpers/generateTotp";
import signToken from "./helpers/signToken";
import verifyToken from "./helpers/verifyToken";
import { TokenTypes } from "./interfaces/tokenPayload.interface";

import CONFIG from "../config/secrets";
import { Tokens, Result } from "../graphql/authorization.types";
import userService from "../user/user.service";
import logger from "../utils/logger";

// TODO: refresh token rotation
const authorizationController = {
  craftAccessToken: async (id: string): Promise<string> => {
    const exp = Math.floor(Date.now() / 1000) + ACCESS_TOKEN_EXPIRATION;
    const payload = {
      exp,
      sub: id,
      tokenUse: TokenTypes.access,
    };
    return signToken(payload);
  },

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
   * Creates a new user and returns the tokens to use it
   */
  createUser: async (): Promise<Tokens> => {
    logger.debug("[createUser] crafting tokens for a new user");
    const newUser = await userService.createUser();
    const userId = newUser.id;
    const [accessToken, refreshToken] = await Promise.all([
      authorizationController.craftAccessToken(userId),
      authorizationController.craftRefreshToken(userId),
    ]);
    return { accessToken, refreshToken };
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
        throw new Error("Invalid token type");
      }
      const exp = Math.floor(Date.now() / 1000) + ACCESS_TOKEN_EXPIRATION;
      const payload = {
        exp,
        sub,
        tokenUse: TokenTypes.access,
      };
      return signToken(payload);
    } catch (error) {
      logger.error(`[getAccessToken] ${error}`);
      throw new Error("Invalid refresh token");
    }
  },

  // TODO: similar function for exercises Server to validate an email for a user
  // TODO: limit the number of requests from a single client
  getTotp: async (email: string): Promise<Result> => {
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
