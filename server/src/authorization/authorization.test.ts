import gql from "graphql-tag";
import jwt from "jsonwebtoken";
import Mongoose from "mongoose";

import {
  APP_ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION,
} from "./constants";
import signToken from "./helpers/signToken";
import verifyToken from "./helpers/verifyToken";
import { TokenTypes } from "./interfaces/tokenPayload.interface";

import { LoginInput } from "../graphql/authorization.types";
import User from "../user/models/user.model";
import userService from "../user/user.service";
import getDbConnection from "../utils/tests/dbConnection";
import { authorizationClient } from "../utils/tests/graphqlClient";

const CREATE_APP_USER = gql`
  mutation createAppUser {
    createAppUser {
      accessToken
      refreshToken
    }
  }
`;

const CREATE_WEB_USER = gql`
  mutation createWebUser {
    createWebUser {
      success
    }
  }
`;

const GET_ACCESS_TOKEN = gql`
  query getAccessToken($refreshToken: String!) {
    getAccessToken(refreshToken: $refreshToken)
  }
`;

const APP_LOGIN = gql`
  query loginAppUser($loginInput: LoginInput!) {
    loginAppUser(loginInput: $loginInput) {
      accessToken
      refreshToken
    }
  }
`;

const SEND_TOTP = gql`
  query sendTotp($email: String!) {
    sendTotp(email: $email) {
      success
    }
  }
`;

const INVALID_EMAIL = "invalid@email";
const NOT_FOUND_EMAIL = "not.found@manwords.fr";
const VALID_EMAIL_1 = "valid1@email.fr";
const VALID_EMAIL_2 = "hello2@manywords.fr";
const VALID_EMAIL_3 = "hello3@manywords.fr";
const VALID_EMAIL_4 = "hello4@manywords.fr";
const VALID_EMAIL_5 = "hello5@manywords.fr";

let db: typeof Mongoose;
beforeAll(async () => {
  db = await getDbConnection();
});

afterAll(async () => {
  // remove all users created to test the tokens, i.e. without emails
  await User.deleteMany({ email: { $exists: false } });
  await User.deleteOne({ email: VALID_EMAIL_1 });
  await User.deleteOne({ email: VALID_EMAIL_2 });
  db.connection.close();
});

describe("Authorization server - e2e", () => {
  let validRefreshToken: string;

  // -----------------     CREATE_APP_USER     ------------------
  it("should create a user and return the tokens", async () => {
    const res = await authorizationClient.mutate({
      mutation: CREATE_APP_USER,
    });
    const {
      data: {
        createAppUser: { accessToken, refreshToken },
      },
    } = res;

    expect(accessToken).toBeDefined();
    const decodedAT = await verifyToken(accessToken);
    expect(decodedAT.exp).toBeCloseTo(
      Math.floor(Date.now() / 1000) + APP_ACCESS_TOKEN_EXPIRATION,
      -3
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

  // -----------------     CREATE_WEB_USER     ------------------
  it("should create a user and return the tokens inside cookies", async () => {
    const res = await authorizationClient.mutate({
      mutation: CREATE_WEB_USER,
    });
    const {
      data: {
        createWebUser: { success },
      },
    } = res;

    // only verify that the cookies are there
    expect(success).toEqual(true);
    // const decodedAT = await verifyToken(accessToken);
    // expect(decodedAT.exp).toBeCloseTo(
    //   Math.floor(Date.now() / 1000) + ACCESS_TOKEN_EXPIRATION
    // );
    // expect(decodedAT.sub).toBeDefined();
    // expect(decodedAT.tokenUse).toEqual(TokenTypes.access);

    // expect(refreshToken).toBeDefined();
    // validRefreshToken = refreshToken;
    // const decodedRT = await verifyToken(refreshToken);
    // expect(decodedRT.exp).toBeCloseTo(
    //   Math.floor(Date.now() / 1000) + REFRESH_TOKEN_EXPIRATION
    // );
    // expect(decodedRT.sub).toBeDefined();
    // expect(decodedRT.sub).toEqual(decodedAT.sub);
    // expect(decodedRT.tokenUse).toEqual(TokenTypes.refresh);
  });

  // -----------------     GET_APP_ACCESS_TOKEN      ------------------
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
      Math.floor(Date.now() / 1000) + APP_ACCESS_TOKEN_EXPIRATION
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

  // -----------------     SEND_TOTP     ------------------
  it("should send an email with totp", async () => {
    const res = await authorizationClient.query({
      query: SEND_TOTP,
      variables: { email: VALID_EMAIL_1 },
    });

    expect(res.data.sendTotp.success).toEqual(true);
    // the user should be created with this email and proper totp and expiration date
    const user = await User.findOne({ email: VALID_EMAIL_1 });
    expect(user?.login.expiresAt).toBeDefined();
    expect(user?.login.totp).toBeDefined();
  });

  it("should throw with an invalid email format", async () => {
    await expect(
      authorizationClient.query({
        query: SEND_TOTP,
        variables: { email: INVALID_EMAIL },
      })
    ).rejects.toThrowError("Invalid email format");
    const user = await User.findOne({ email: INVALID_EMAIL });
    expect(user).toBeNull();
  });

  // -----------------     APP_LOGIN     ------------------
  it("should verify the user and receive tokens", async () => {
    // creates a new user with verifiable values
    await userService.setTotp(VALID_EMAIL_2, 189657);

    const loginInput = {
      email: VALID_EMAIL_2,
      totp: 189657,
    };
    const res = await authorizationClient.query({
      query: APP_LOGIN,
      variables: { loginInput },
    });
    const {
      data: {
        loginAppUser: { accessToken, refreshToken },
      },
    } = res;
    expect(accessToken).toBeDefined();
    expect(refreshToken).toBeDefined();
  });

  it("should throw an error if the given email is of invalid format", async () => {
    const loginInput = {
      email: INVALID_EMAIL,
      totp: 180057,
    };
    await expect(
      authorizationClient.query({
        query: APP_LOGIN,
        variables: { loginInput },
      })
    ).rejects.toThrowError("InvalidEmail");
  });

  it("should throw an error if the given totp is of invalid format", async () => {
    const loginInput = {
      email: VALID_EMAIL_1,
      totp: 18005765,
    };
    await expect(
      authorizationClient.query({
        query: APP_LOGIN,
        variables: { loginInput },
      })
    ).rejects.toThrowError("InvalidTotp");
  });

  it("should throw an error if the given email is not found", async () => {
    const loginInput: LoginInput = {
      email: NOT_FOUND_EMAIL,
      totp: 180055,
    };
    await expect(
      authorizationClient.query({
        query: APP_LOGIN,
        variables: { loginInput },
      })
    ).rejects.toThrowError("RequestFailed");
  });

  it("should throw an error if the given totp is expired", async () => {
    // creates a new user that requested a totp half an hour ago
    await userService.createUser({
      email: VALID_EMAIL_3,
      login: { totp: 180055, expiresAt: Date.now() - 30 * 60 * 1000 },
    });
    const loginInput: LoginInput = {
      email: VALID_EMAIL_3,
      totp: 180055,
    };
    await expect(
      authorizationClient.query({
        query: APP_LOGIN,
        variables: { loginInput },
      })
    ).rejects.toThrowError("GraphQL error: ExpiredTotp");
  });

  it("should throw an error if the user has no totp previously set", async () => {
    await userService.createUser({ email: VALID_EMAIL_4 });
    const loginInput: LoginInput = {
      email: VALID_EMAIL_4,
      totp: 180055,
    };
    await expect(
      authorizationClient.query({
        query: APP_LOGIN,
        variables: { loginInput },
      })
    ).rejects.toThrowError("GraphQL error: RequestFailed");
  });

  it("should throw an explicit error if the totp is wrong", async () => {
    await userService.setTotp(VALID_EMAIL_5, 189888);
    const loginInput: LoginInput = {
      email: VALID_EMAIL_5,
      totp: 189777,
    };
    await expect(
      authorizationClient.query({
        query: APP_LOGIN,
        variables: { loginInput },
      })
    ).rejects.toThrowError("WrongTotp");
  });

  // -----------------     WEB_LOGIN     ------------------
});
