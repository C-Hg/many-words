import { FetchResult } from "@apollo/client/core";
import { gql } from "apollo-server-express";

import { client } from "./graphqlClient";

import { Mutation } from "../../graphql/types";
import { TOTP_EXPIRATION } from "../../user/constants";
import userService from "../../user/user.service";
import logger from "../logger";

const LOG_IN_APP_USER = gql`
  mutation logInAppUser($loginInput: LoginInput!) {
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
  const { data }: FetchResult<Mutation> = await client.mutate({
    mutation: LOG_IN_APP_USER,
    variables: { loginInput },
  });
  const accessToken = data?.logInAppUser?.accessToken;

  if (!accessToken) {
    logger.error("[getAccessToken] cannot fetch token");
    return "";
  }
  return accessToken;
};

export default getAccessTokenForUser;
