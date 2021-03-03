import { Response } from "express";

import userService from "./user.service";

import { CLIENTS } from "../authorization/constants";
import craftAccessToken from "../authorization/helpers/jwt/craftAccessToken";
import craftRefreshToken from "../authorization/helpers/jwt/craftRefreshToken";
import setCookies from "../authorization/helpers/setCookies";
import exercisesService from "../exercises/exercises.service";
import logger from "../utils/logger";

const userController = {
  /**
   * Creates a new user for a mobile device
   * Tokens are stored securely with keyChain
   */
  // createAppUser: async (): Promise<Tokens> => {
  //   logger.debug("[createUser] crafting tokens for a new mobile user");
  //   const newUser = await userService.createUser();
  //   const [accessToken, refreshToken] = await Promise.all([
  //     craftAccessToken(newUser.id, CLIENTS.app),
  //     craftRefreshToken(newUser.id),
  //   ]);
  //   return { accessToken, refreshToken };
  // },

  /**
   * Creates a new user for the website
   * Tokens are stored securely inside cookies
   * If we had sensitive data we would add xsrf protection
   */
  createWebUser: async (res: Response): Promise<void> => {
    logger.debug("[createWebUser] crafting tokens for a new website user");
    const newUser = await userService.createUser();
    const userId = newUser.id;
    // creates the curriculum document for the user
    await exercisesService.createCurriculum(userId);
    // prepare the cookies for user authentication
    const accessToken = await craftAccessToken(userId, CLIENTS.web);
    const refreshToken = await craftRefreshToken(userId);
    setCookies(res, accessToken, refreshToken);
  },
};

export default userController;
