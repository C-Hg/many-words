import { gql } from "apollo-server-express";

import getDbConnection from "./dbConnection";
import { authorizationClient } from "./graphqlClient";

import { TOTP_EXPIRATION } from "../../user/constants";
import userService from "../../user/user.service";

const LOG_IN_APP_USER = gql`
  query logInAppUser($loginInput: LoginInput!) {
    logInAppUser(loginInput: $loginInput) {
      accessToken
      refreshToken
    }
  }
`;

const getAccessTokenForUser = async (email: string): Promise<string> => {
  await userService.createUser({
    email,
    login: { totp: 222111, expiresAt: Date.now() + TOTP_EXPIRATION },
  });
  const loginInput = {
    email,
    totp: 222111,
  };
  const res = await authorizationClient.query({
    query: LOG_IN_APP_USER,
    variables: { loginInput },
  });
  const {
    data: {
      logInAppUser: { accessToken },
    },
  } = res;

  return accessToken;
};

export default getAccessTokenForUser;
