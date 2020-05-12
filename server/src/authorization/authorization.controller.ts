import { Tokens } from "../graphql/authorization.types";
import userService from "../user/user.service";

// TODO: refresh token rotation
const authorizationController = {
  craftAccessToken: async (id: string): Promise<string> => {
    return "";
  },

  craftRefreshToken: async (id: string): Promise<string> => {
    return "";
  },

  createUser: async (): Promise<Tokens> => {
    // create a new user and get its id
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
