import gql from "graphql-tag";
import jwt from "jsonwebtoken";

import { ACCESS_TOKEN_EXPIRATION, REFRESH_TOKEN_EXPIRATION } from "./constants";
import signToken from "./helpers/signToken";
import verifyToken from "./helpers/verifyToken";
import { TokenTypes } from "./interfaces/tokenPayload.interface";

import { authorizationClient } from "../utils/graphqlClient";

const CREATE_USER = gql`
  mutation createUser {
    createUser {
      accessToken
      refreshToken
    }
  }
`;

const GET_ACCESS_TOKEN = gql`
  query getAccessToken($refreshToken: String!) {
    getAccessToken(refreshToken: $refreshToken)
  }
`;

const LOGIN_WITH_TOTP = gql`
  query getTotp($email: String!) {
    getTotp(email: $email) {
      success
    }
  }
`;

describe("Server - e2e", () => {
  let validRefreshToken: string;
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
    const decodedAT = await verifyToken(accessToken);
    expect(decodedAT.exp).toBeCloseTo(
      Math.floor(Date.now() / 1000) + ACCESS_TOKEN_EXPIRATION
    );
    expect(decodedAT.sub).toBeDefined();
    expect(decodedAT.tokenUse).toEqual(TokenTypes.access);

    expect(refreshToken).toBeDefined();
    validRefreshToken = refreshToken;
    const decodedRT = await verifyToken(refreshToken);
    expect(decodedRT.exp).toBeCloseTo(
      Math.floor(Date.now() / 1000) + REFRESH_TOKEN_EXPIRATION
    );
    expect(decodedRT.sub).toBeDefined();
    expect(decodedRT.sub).toEqual(decodedAT.sub);
    expect(decodedRT.tokenUse).toEqual(TokenTypes.refresh);
  });

  it("should get a new access token from refresh token", async () => {
    const res = await authorizationClient.query({
      query: GET_ACCESS_TOKEN,
      variables: { refreshToken: validRefreshToken },
    });
    const {
      data: { getAccessToken: accessToken },
    } = res;

    expect(accessToken).toBeDefined();
    const decodedAT = await verifyToken(accessToken);
    const decodedRT = await verifyToken(validRefreshToken);
    expect(decodedAT.exp).toBeCloseTo(
      Math.floor(Date.now() / 1000) + ACCESS_TOKEN_EXPIRATION
    );
    expect(decodedAT.sub).toEqual(decodedRT.sub);
    expect(decodedAT.tokenUse).toEqual(TokenTypes.access);
  });

  it("should throw an error if the refresh token is expired", async () => {
    const exp = Math.floor(Date.now() / 1000) - 10;
    const payload = {
      exp,
      sub: "anInvalidId",
      tokenUse: TokenTypes.refresh,
    };
    const expiredRefreshToken = await signToken(payload);
    await expect(
      authorizationClient.query({
        query: GET_ACCESS_TOKEN,
        variables: { refreshToken: expiredRefreshToken },
      })
      // rejection reason is hidden from the client
    ).rejects.toThrowError("Invalid refresh token");
  });

  it("should throw an error if it is an access token", async () => {
    const exp = Math.floor(Date.now() / 1000) + 5000;
    const payload = {
      exp,
      sub: "anInvalidId",
      tokenUse: TokenTypes.access,
    };
    const disguisedRefreshToken = await signToken(payload);
    await expect(
      authorizationClient.query({
        query: GET_ACCESS_TOKEN,
        variables: { refreshToken: disguisedRefreshToken },
      })
    ).rejects.toThrowError("Invalid refresh token");
  });

  it("should throw an error if the refresh token signature is wrong", async () => {
    const exp = Math.floor(Date.now() / 1000) + 50000;
    const payload = {
      exp,
      sub: "anInvalidId",
      tokenUse: TokenTypes.refresh,
    };
    const invalidRefreshToken = await new Promise((resolve, reject) => {
      jwt.sign(payload, "aDifferentSecretSignature", function (error, token) {
        if (token) {
          resolve(token);
        } else {
          reject(error);
        }
      });
    });
    await expect(
      authorizationClient.query({
        query: GET_ACCESS_TOKEN,
        variables: { refreshToken: invalidRefreshToken },
      })
    ).rejects.toThrowError("Invalid refresh token");
  });

  it("should send an email with totp", async () => {
    const res = await authorizationClient.query({
      query: LOGIN_WITH_TOTP,
      variables: { email: "valid@email.fr" },
    });
    expect(res.data.getTotp.success).toEqual(true);
  });

  it("should throw with an invalid email format", async () => {
    await expect(
      authorizationClient.query({
        query: LOGIN_WITH_TOTP,
        variables: { email: "invalid@email" },
      })
    ).rejects.toThrowError("Invalid email format");
  });

  // it should throw an error if the given email is of invalid format

  // it should get new tokens if the totp is correct

  // it should throw an explicit error if the totp is wrong
});
