import { toPromise } from "apollo-link";
import gql from "graphql-tag";
import Mongoose from "mongoose";

import { TOTP_EXPIRATION } from "./constants";
import User from "./models/user.model";
import userService from "./user.service";

import logger from "../utils/logger";
import getDbConnection from "../utils/tests/dbConnection";
import {
  learnClient,
  authorizationClient,
  getAuthenticatedLearnClient,
} from "../utils/tests/graphqlClient";

const LOG_IN_APP_USER = gql`
  query logInAppUser($loginInput: LoginInput!) {
    logInAppUser(loginInput: $loginInput) {
      accessToken
      refreshToken
    }
  }
`;

const USER_QUERY = gql`
  query user {
    user {
      id
      email
      stats {
        global {
          globalProgress
          goldLessons
          goldWords
          greenLessons
          greenWords
          studiedLessons
          studiedWords
        }
        topics {
          id
        }
      }
    }
  }
`;

const USER_1 = "user1@manywords.fr";

let db: typeof Mongoose;
beforeAll(async () => {
  db = await getDbConnection();
});

afterAll(async () => {
  await User.deleteMany({
    email: {
      $in: [USER_1],
    },
  });
  await db.connection.close();
});

describe("Server - e2e - user", () => {
  // -----------------     BASIC AUTHORIZATION LOGIC    ------------------
  it("should return a 401 error if no token is provided", async () => {
    await expect(
      learnClient.query({
        query: USER_QUERY,
      })
    ).rejects.toThrowError("401");
  });

  it("should get a new user after its first login, provided a valid token", async () => {
    // get a valid token first for a new user
    // TODO: extract this function to connect a test user with email and retrieve the token
    // need to open and close the db connection in a separated util function
    await userService.createUser({
      email: USER_1,
      login: { totp: 222111, expiresAt: Date.now() + TOTP_EXPIRATION },
    });
    const loginInput = {
      email: USER_1,
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
    const authenticatedLearnClient = getAuthenticatedLearnClient(accessToken);
    const userData = await authenticatedLearnClient.query({
      query: USER_QUERY,
    });
    const {
      data: {
        user: {
          email,
          stats: {
            global: {
              globalProgress,
              goldLessons,
              goldWords,
              greenLessons,
              greenWords,
              studiedLessons,
              studiedWords,
            },
            topics,
          },
        },
      },
    } = userData;
    expect(email).toEqual(USER_1);
    expect(globalProgress).toEqual(0);
    expect(goldLessons).toEqual(0);
    expect(greenLessons).toEqual(0);
    expect(goldWords).toEqual(0);
    expect(greenWords).toEqual(0);
    expect(studiedLessons).toEqual(0);
    expect(studiedWords).toEqual(0);
    expect(topics).toEqual([]);
  });

  // it should return a 401 error if the token is expired
  // it should return a 401 if the user does not exist

  // it("should get user", async () => {
  //   const res = await toPromise(
  //     unauthenticatedGraphql({
  //       query: USER_QUERY,
  //     })
  //   );
  //   expect(res).toMatchSnapshot();
  // });

  // it should delete the user
});
