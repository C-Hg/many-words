import gql from "graphql-tag";

import { authorizationClient } from "../utils/graphqlClient";

const CREATE_USER = gql`
  mutation createUser {
    createUser {
      accessToken
      refreshToken
    }
  }
`;

describe("Server - e2e", () => {
  it("should create a user and return the tokens", async () => {
    const res = await authorizationClient.mutate({
      mutation: CREATE_USER,
    });
    const {
      data: {
        createUser: { accessToken, refreshToken },
      },
    } = res;
    expect(accessToken).toBeDefined();
    expect(refreshToken).toBeDefined();
  });

  // it should get a new access token from refresh token

  // it should throw an error if the refresh token is expired

  // it should send an email with totp

  // it should throw an error if the given email is of invalid format

  // it should get new tokens if the totp is correct

  // it should throw an explicit error if the totp is wrong
});
