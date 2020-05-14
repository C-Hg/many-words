import { ACCESS_TOKEN_EXPIRATION, REFRESH_TOKEN_EXPIRATION } from "./constants";
import signToken from "./helpers/signToken";
import { TokenTypes } from "./interfaces/tokenPayload.interface";

import { Tokens } from "../graphql/authorization.types";
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
};

export default authorizationController;
