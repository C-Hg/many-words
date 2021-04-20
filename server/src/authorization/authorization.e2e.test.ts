import { ApolloQueryResult, FetchResult, gql } from "@apollo/client/core";
import Mongoose from "mongoose";

import { AuthorizationErrors } from "./constants";

import { LoginInput, Query, Mutation } from "../graphql/types";
import { TOTP_EXPIRATION } from "../user/constants";
import User from "../user/models/user.model";
import userService from "../user/user.service";
import createTestUser from "../utils/tests/createTestUser";
import getDbConnection from "../utils/tests/dbConnection";
import { client, getAuthenticatedClient } from "../utils/tests/graphqlClient";

// const CREATE_APP_USER = gql`
//   mutation createAppUser {
//     createAppUser {
//       accessToken
//       refreshToken
//     }
//   }
// `;

const CREATE_WEB_USER_TEST = gql`
  mutation {
    createWebUser {
      success
    }
  }
`;

// TODO: implement logic for app users
const GET_ACCESS_TOKEN_WEB_USER = gql`
  query getAccessTokenWebUser {
    getAccessTokenWebUser {
      success
    }
  }
`;

// const LOG_IN_APP_USER = gql`
//   mutation logInAppUser($loginInput: LoginInput!) {
//     logInAppUser(loginInput: $loginInput) {
//       accessToken
//       refreshToken
//     }
//   }
// `;

const LOG_IN_WEB_USER = gql`
  mutation logInWebUser($loginInput: LoginInput!) {
    logInWebUser(loginInput: $loginInput) {
      reason
      success
    }
  }
`;

const SEND_TOTP_TO_LOGIN = gql`
  mutation sendTotpToLogIn($email: String!) {
    sendTotpToLogIn(email: $email) {
      reason
      success
    }
  }
`;

const INVALID_EMAIL = "invalid@email";
const NOT_FOUND_EMAIL = "not.found@manwords.fr";
const USER_1 = "authorization.user1@e2etest.fr";
const USER_2 = "authorization.user2@e2etest.fr";
const USER_3 = "authorization.user3@e2etest.fr";
const USER_4 = "authorization.user4@e2etest.fr";
const USER_5 = "authorization.user5@e2etest.fr";
const USER_6 = "authorization.user6@e2etest.fr";
const USER_7 = "authorization.user7@e2etest.fr";
const VALID_EMAIL_1 = "valid1@email.fr";
const VALID_EMAIL_11 = "valid11@email.fr";
const VALID_EMAIL_2 = "hello2@manywords.fr";
const VALID_EMAIL_3 = "hello3@manywords.fr";
const VALID_EMAIL_4 = "hello4@manywords.fr";
const VALID_EMAIL_5 = "hello5@manywords.fr";
const VALID_EMAIL_6 = "hello6@manywords.fr";
const VALID_EMAIL_7 = "hello7@manywords.fr";
const VALID_EMAIL_8 = "hello8@manywords.fr";
const VALID_EMAIL_9 = "hello9@manywords.fr";

let db: typeof Mongoose;

describe("Authorization server - e2e", () => {
  beforeAll(async () => {
    db = await getDbConnection();
  });

  afterAll(async () => {
    // remove all users created to test the tokens, i.e. without emails
    await User.deleteMany({ email: { $exists: false } });
    await User.deleteMany({
      email: {
        $in: [
          USER_1,
          USER_2,
          USER_3,
          USER_4,
          USER_5,
          USER_6,
          USER_7,
          VALID_EMAIL_1,
          VALID_EMAIL_11,
          VALID_EMAIL_2,
          VALID_EMAIL_3,
          VALID_EMAIL_4,
          VALID_EMAIL_5,
          VALID_EMAIL_6,
          VALID_EMAIL_7,
          VALID_EMAIL_8,
          VALID_EMAIL_9,
        ],
      },
    });
    await db.connection.close();
  });

  // -----------------     CREATE_WEB_USER     ------------------
  it("should create a user and return the tokens inside cookies", async () => {
    const { data }: FetchResult<Mutation> = await client.mutate({
      mutation: CREATE_WEB_USER_TEST,
    });
    const success = data?.createWebUser?.success;

    // only verify that the call succeeded, setting cookies is unit tested
    expect(success).toEqual(true);
  });

  // -----------------     GET_ACCESS_TOKEN_WEB_USER     ------------------
  it("should get an error for a query without refresh token", async () => {
    const { data }: ApolloQueryResult<Query> = await client.query({
      query: GET_ACCESS_TOKEN_WEB_USER,
    });

    const success = data.getAccessTokenWebUser.success;
    expect(success).toEqual(false);
  });

  // -----------------     SEND_TOTP_TO_LOGIN    ------------------
  //  this operation does not require an authenticated client
  it("should send an email with totp", async () => {
    const { id } = await createTestUser(USER_1);
    const res: FetchResult<Mutation> = await client.mutate({
      mutation: SEND_TOTP_TO_LOGIN,
      variables: { email: USER_1 },
    });

    expect(res?.data?.sendTotpToLogIn?.success).toEqual(true);
    // the user should be updated with this totp, expiration date and emailToConfirm
    const user = await User.findById(id);

    expect(user?.login.expiresAt).toBeDefined();
    expect(user?.login.totp).toBeDefined();
  });

  it("should explicitly fail with an invalid email format", async () => {
    const res: FetchResult<Mutation> = await client.mutate({
      mutation: SEND_TOTP_TO_LOGIN,
      variables: { email: INVALID_EMAIL },
    });
    expect(res?.data?.sendTotpToLogIn?.reason).toEqual(
      AuthorizationErrors.invalidEmailFormat
    );
    expect(res?.data?.sendTotpToLogIn?.success).toEqual(false);
  });

  it("should explicitly fail if no account exists with this email", async () => {
    const res: FetchResult<Mutation> = await client.mutate({
      mutation: SEND_TOTP_TO_LOGIN,
      variables: { email: NOT_FOUND_EMAIL },
    });
    expect(res?.data?.sendTotpToLogIn?.reason).toEqual(
      AuthorizationErrors.emailNotFound
    );
    expect(res?.data?.sendTotpToLogIn?.success).toEqual(false);
  });

  // -----------------     LOG_IN_WEB_USER     ------------------
  //  this operation does not require an authenticated client
  it("should verify the user and receive cookies with access and refresh tokens", async () => {
    // creates a new user with verifiable values
    const { id } = await userService.createUser({ email: VALID_EMAIL_9 });
    await userService.setTotpToLogin(VALID_EMAIL_9, 189657);

    const loginInput = {
      email: VALID_EMAIL_9,
      totp: 189657,
    };
    const res: FetchResult<Mutation> = await client.mutate({
      mutation: LOG_IN_WEB_USER,
      variables: { loginInput },
    });
    expect(res?.data?.logInWebUser?.success).toEqual(true);

    const user = await User.findById(id);
    expect(user?.login.totp).toBeNull();
    expect(user?.login.expiresAt).toBeNull();
  });

  it("should explicitly fail if the given totp is of invalid format", async () => {
    const loginInput = {
      email: VALID_EMAIL_1,
      totp: 18005765,
    };
    const res: FetchResult<Mutation> = await client.mutate({
      mutation: LOG_IN_WEB_USER,
      variables: { loginInput },
    });
    expect(res?.data?.logInWebUser?.reason).toEqual(
      AuthorizationErrors.invalidTotp
    );
    expect(res?.data?.logInWebUser?.success).toEqual(false);
  });

  it("should explicitly fail if the given email is not found", async () => {
    const loginInput: LoginInput = {
      email: NOT_FOUND_EMAIL,
      totp: 180055,
    };
    const { data }: FetchResult<Mutation> = await client.mutate({
      mutation: LOG_IN_WEB_USER,
      variables: { loginInput },
    });
    expect(data?.logInWebUser.reason).toEqual(
      AuthorizationErrors.emailNotFound
    );
    expect(data?.logInWebUser.success).toEqual(false);
  });

  it("should explicitly fail if the given totp is expired", async () => {
    // creates a new user that requested a totp half an hour ago
    await userService.createUser({
      email: VALID_EMAIL_8,
      login: { totp: 180055, expiresAt: Date.now() - 30 * 60 * 1000 },
    });
    const loginInput: LoginInput = {
      email: VALID_EMAIL_8,
      totp: 180055,
    };
    const { data }: FetchResult<Mutation> = await client.mutate({
      mutation: LOG_IN_WEB_USER,
      variables: { loginInput },
    });
    expect(data?.logInWebUser.reason).toEqual(AuthorizationErrors.expiredTotp);
    expect(data?.logInWebUser.success).toEqual(false);
  });

  it("should explicitly fail if the user has no totp previously set", async () => {
    await userService.createUser({ email: VALID_EMAIL_6 });
    const loginInput: LoginInput = {
      email: VALID_EMAIL_6,
      totp: 180055,
    };
    const { data }: FetchResult<Mutation> = await client.mutate({
      mutation: LOG_IN_WEB_USER,
      variables: { loginInput },
    });
    expect(data?.logInWebUser.reason).toEqual(AuthorizationErrors.noTotp);
    expect(data?.logInWebUser.success).toEqual(false);
  });

  it("should explicitly fail if the totp is wrong", async () => {
    await userService.createUser({ email: VALID_EMAIL_7 });
    await userService.setTotpToLogin(VALID_EMAIL_7, 189888);
    const loginInput: LoginInput = {
      email: VALID_EMAIL_7,
      totp: 189777,
    };
    const { data }: FetchResult<Mutation> = await client.mutate({
      mutation: LOG_IN_WEB_USER,
      variables: { loginInput },
    });
    expect(data?.logInWebUser.success).toEqual(false);
    expect(data?.logInWebUser.reason).toEqual(AuthorizationErrors.wrongTotp);
  });

  // -----------------     SEND_TOTP_TO_VERIFY_EMAIL    ------------------
  it("should throw if the user is not connected", async () => {
    await expect(
      client.mutate({
        mutation: SEND_TOTP_TO_VERIFY_EMAIL,
        variables: { email: INVALID_EMAIL },
      })
    ).rejects.toThrowError("Disconnected");
  });

  it("should explicitly fail if the email is invalid", async () => {
    const { accessToken } = await createTestUser(USER_2);
    const authenticatedClient = getAuthenticatedClient(accessToken);
    const res: FetchResult<Mutation> = await authenticatedClient.mutate({
      mutation: SEND_TOTP_TO_VERIFY_EMAIL,
      variables: { email: INVALID_EMAIL },
    });
    expect(res?.data?.sendTotpToVerifyEmail?.reason).toEqual(
      AuthorizationErrors.invalidEmailFormat
    );
    expect(res?.data?.sendTotpToVerifyEmail?.success).toEqual(false);
  });

  it("should successfully send a totp to verify a valid email", async () => {
    const { accessToken, id } = await createTestUser(USER_3);
    const authenticatedClient = getAuthenticatedClient(accessToken);
    const res: FetchResult<Mutation> = await authenticatedClient.mutate({
      mutation: SEND_TOTP_TO_VERIFY_EMAIL,
      variables: { email: VALID_EMAIL_1 },
    });
    expect(res?.data?.sendTotpToVerifyEmail?.success).toEqual(true);

    const user = await User.findById(id);
    expect(user?.verifyEmail.emailToConfirm).toEqual(VALID_EMAIL_1);
    expect(user?.verifyEmail.expiresAt).toBeDefined();
    expect(user?.verifyEmail.totp).toBeDefined();
  });

  // ----------------------        VERIFY EMAIL         --------------------------------
  it("should throw if the user is not connected", async () => {
    await expect(
      client.mutate({
        mutation: VERIFY_EMAIL,
        variables: { email: INVALID_EMAIL },
      })
    ).rejects.toThrowError("Disconnected");
  });

  it("should verify the email successfully", async () => {
    const { accessToken, id } = await createTestUser(USER_4);
    const authenticatedClient = getAuthenticatedClient(accessToken);
    const EMAIL_TO_VALIDATE = "valid.email@hello.fr";
    await User.findByIdAndUpdate(id, {
      login: {
        totp: 111222,
        emailToConfirm: EMAIL_TO_VALIDATE,
        expiresAt: Date.now() + TOTP_EXPIRATION,
      },
    });

    const res: FetchResult<Mutation> = await authenticatedClient.mutate({
      mutation: VERIFY_EMAIL,
      variables: { email: EMAIL_TO_VALIDATE, totp: 111222 },
    });
    expect(res.data.verifyEmail.success).toEqual(true);

    const user = await User.findById(id);
    expect(user?.email).toEqual(EMAIL_TO_VALIDATE);
    expect(user?.verifyEmail.emailToConfirm).toBeNull();
    expect(user?.verifyEmail.totp).toBeNull();
    expect(user?.verifyEmail.expiresAt).toBeNull();
  });

  it("should explicitly fail if the totp is wrong", async () => {
    const { accessToken, id } = await createTestUser(USER_5);
    const authenticatedClient = getAuthenticatedClient(accessToken);
    const EMAIL_TO_VALIDATE = "valid.email@hello.fr";
    await User.findByIdAndUpdate(id, {
      login: {
        totp: 111222,
        emailToConfirm: EMAIL_TO_VALIDATE,
        expiresAt: Date.now() + TOTP_EXPIRATION,
      },
    });

    const res: FetchResult<Mutation> = await authenticatedClient.mutate({
      mutation: VERIFY_EMAIL,
      variables: { email: EMAIL_TO_VALIDATE, totp: 333222 },
    });
    expect(res.data.verifyEmail.success).toEqual(false);
    expect(res.data.verifyEmail.reason).toEqual(AuthorizationErrors.wrongTotp);
  });

  it("should explicitly fail if the totp is expired", async () => {
    const { accessToken, id } = await createTestUser(USER_6);
    const authenticatedClient = getAuthenticatedClient(accessToken);
    const EMAIL_TO_VALIDATE = "valid.email@hello.fr";
    await User.findByIdAndUpdate(id, {
      login: {
        totp: 111222,
        emailToConfirm: EMAIL_TO_VALIDATE,
        expiresAt: Date.now() - TOTP_EXPIRATION,
      },
    });

    const res: FetchResult<Mutation> = await authenticatedClient.mutate({
      mutation: VERIFY_EMAIL,
      variables: { email: EMAIL_TO_VALIDATE, totp: 111222 },
    });
    expect(res.data.verifyEmail.success).toEqual(false);
    expect(res.data.verifyEmail.reason).toEqual(
      AuthorizationErrors.expiredTotp
    );
  });

  it("should explicitly fail if the email is not matching", async () => {
    const { accessToken, id } = await createTestUser(USER_7);
    const authenticatedClient = getAuthenticatedClient(accessToken);
    await User.findByIdAndUpdate(id, {
      login: {
        totp: 111222,
        emailToConfirm: "valid.email@hello.fr",
        expiresAt: Date.now() - TOTP_EXPIRATION,
      },
    });

    const res: FetchResult<Mutation> = await authenticatedClient.mutate({
      mutation: VERIFY_EMAIL,
      variables: { email: "valid.email2@hello.fr", totp: 111222 },
    });
    expect(res.data.verifyEmail.success).toEqual(false);
    expect(res.data.verifyEmail.reason).toEqual(AuthorizationErrors.wrongEmail);
  });
});

// -----------------     CREATE_APP_USER     ------------------
// it("should create a user and return the tokens", async () => {
//   const res: FetchResult<Mutation> = await client.mutate({
//     mutation: CREATE_APP_USER,
//   });
//   const {
//     data: {
//       createAppUser: { accessToken, refreshToken },
//     },
//   } = res;

//   expect(accessToken).toBeDefined();
//   const decodedAT = await verifyToken(accessToken);
//   expect(decodedAT.exp).toBeCloseTo(
//     Math.floor(Date.now() / 1000) + APP_ACCESS_TOKEN_EXPIRATION,
//     -3
//   );
//   expect(decodedAT.sub).toBeDefined();
//   expect(decodedAT.tokenUse).toEqual(TokenTypes.access);

//   expect(refreshToken).toBeDefined();
//   validRefreshToken = refreshToken;
//   const decodedRT = await verifyToken(refreshToken);
//   expect(decodedRT.exp).toBeCloseTo(
//     Math.floor(Date.now() / 1000) + REFRESH_TOKEN_EXPIRATION,
//     -3
//   );
//   expect(decodedRT.sub).toBeDefined();
//   expect(decodedRT.sub).toEqual(decodedAT.sub);
//   expect(decodedRT.tokenUse).toEqual(TokenTypes.refresh);
// });

// -----------------     GET_APP_ACCESS_TOKEN      ------------------
// it("should get a new access token from refresh token", async () => {
//   const res: ApolloQueryResult<Query> = await client.query({
//     query: GET_ACCESS_TOKEN,
//     variables: { refreshToken: validRefreshToken },
//   });
//   const {
//     data: { getAccessToken: accessToken },
//   } = res;

//   expect(accessToken).toBeDefined();
//   const decodedAT = await verifyToken(accessToken);
//   const decodedRT = await verifyToken(validRefreshToken);
//   expect(decodedAT.exp).toBeCloseTo(
//     Math.floor(Date.now() / 1000) + APP_ACCESS_TOKEN_EXPIRATION
//   );
//   expect(decodedAT.sub).toEqual(decodedRT.sub);
//   expect(decodedAT.tokenUse).toEqual(TokenTypes.access);
// });

// it("should throw an error if the refresh token is expired", async () => {
//   const exp = Math.floor(Date.now() / 1000) - 10;
//   const payload = {
//     exp,
//     sub: "anInvalidId",
//     tokenUse: TokenTypes.refresh,
//   };
//   const expiredRefreshToken = await signToken(payload);
//   await expect(
//     client.query({
//       query: GET_ACCESS_TOKEN,
//       variables: { refreshToken: expiredRefreshToken },
//     })
//     // rejection reason is hidden from the client
//   ).rejects.toThrowError("InvalidToken");
// });

// it("should throw an error if it is an access token", async () => {
//   const exp = Math.floor(Date.now() / 1000) + 5000;
//   const payload = {
//     exp,
//     sub: "anInvalidId",
//     tokenUse: TokenTypes.access,
//   };
//   const disguisedRefreshToken = await signToken(payload);
//   await expect(
//     client.query({
//       query: GET_ACCESS_TOKEN,
//       variables: { refreshToken: disguisedRefreshToken },
//     })
//   ).rejects.toThrowError("InvalidToken");
// });

// it("should throw an error if the refresh token signature is wrong", async () => {
//   const exp = Math.floor(Date.now() / 1000) + 50000;
//   const payload = {
//     exp,
//     sub: "anInvalidId",
//     tokenUse: TokenTypes.refresh,
//   };
//   const invalidRefreshToken = await new Promise((resolve, reject) => {
//     jwt.sign(payload, "aDifferentSecretSignature", function (error, token) {
//       if (token) {
//         resolve(token);
//       } else {
//         reject(error);
//       }
//     });
//   });
//   await expect(
//     client.query({
//       query: GET_ACCESS_TOKEN,
//       variables: { refreshToken: invalidRefreshToken },
//     })
//   ).rejects.toThrowError("InvalidToken");
// });

// -----------------    LOG_IN_APP_USER     ------------------
// it("should verify the user and receive tokens", async () => {
//   // creates a new user with verifiable values
//   const { id } = await userService.createUser();
//   await userService.setTotp(VALID_EMAIL_2, 189657);

//   const loginInput = {
//     email: VALID_EMAIL_2,
//     totp: 189657,
//   };
//   const res: FetchResult<Mutation> = await client.mutate({
//     mutation: LOG_IN_APP_USER,
//     variables: { loginInput },
//   });
//   const {
//     data: {
//       logInAppUser: { accessToken, refreshToken },
//     },
//   } = res;
//   expect(accessToken).toBeDefined();
//   expect(refreshToken).toBeDefined();
// });

// it("should throw an error if the given email is of invalid format", async () => {
//   const loginInput = {
//     email: INVALID_EMAIL,
//     totp: 180057,
//   };
//   await expect(
//     client.mutate({
//       mutation: LOG_IN_APP_USER,
//       variables: { loginInput },
//     })
//   ).rejects.toThrowError("InvalidEmail");
// });

// // TODO: success false and messages
// it("should throw an error if the given totp is of invalid format", async () => {
//   const loginInput = {
//     email: VALID_EMAIL_1,
//     totp: 18005765,
//   };
//   await expect(
//     client.mutate({
//       mutation: LOG_IN_APP_USER,
//       variables: { loginInput },
//     })
//   ).rejects.toThrowError("InvalidTotp");
// });

// it("should throw an error if the given email is not found", async () => {
//   const loginInput: LoginInput = {
//     email: NOT_FOUND_EMAIL,
//     totp: 180055,
//   };
//   await expect(
//     client.mutate({
//       mutation: LOG_IN_APP_USER,
//       variables: { loginInput },
//     })
//   ).rejects.toThrowError("RequestFailed");
// });

// it("should throw an error if the given totp is expired", async () => {
//   // creates a new user that requested a totp half an hour ago
//   await userService.createUser({
//     email: VALID_EMAIL_3,
//     login: { totp: 180055, expiresAt: Date.now() - 30 * 60 * 1000 },
//   });
//   const loginInput: LoginInput = {
//     email: VALID_EMAIL_3,
//     totp: 180055,
//   };
//   await expect(
//     client.mutate({
//       mutation: LOG_IN_APP_USER,
//       variables: { loginInput },
//     })
//   ).rejects.toThrowError("ExpiredTotp");
// });

// it("should throw an error if the user has no totp previously set", async () => {
//   await userService.createUser({ email: VALID_EMAIL_4 });
//   const loginInput: LoginInput = {
//     email: VALID_EMAIL_4,
//     totp: 180055,
//   };
//   await expect(
//     client.mutate({
//       mutation: LOG_IN_APP_USER,
//       variables: { loginInput },
//     })
//   ).rejects.toThrowError("RequestFailed");
// });

// it("should throw an explicit error if the totp is wrong", async () => {
//   const { id } = await userService.createUser({ email: VALID_EMAIL_5 });
//   await userService.setTotpToLogin(189888, id);
//   const loginInput: LoginInput = {
//     email: VALID_EMAIL_5,
//     totp: 189777,
//   };
//   await expect(
//     client.mutate({
//       mutation: LOG_IN_APP_USER,
//       variables: { loginInput },
//     })
//   ).rejects.toThrowError("WrongTotp");
// });
