import { ApolloQueryResult } from "@apollo/client/core";
import gql from "graphql-tag";
import Mongoose from "mongoose";

import User from "./models/user.model";

import { Query } from "../graphql/learn.types";
import getDbConnection from "../utils/tests/dbConnection";
import getAccessTokenForUser from "../utils/tests/getAccessTokenForUser";
import {
  learnClient,
  getAuthenticatedLearnClient,
} from "../utils/tests/graphqlClient";

const GET_USER_LANGUAGE = gql`
  query getUser {
    user {
      id
      language
    }
  }
`;

const USER_QUERY = gql`
  query user {
    user {
      id
      email
      language
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
const USER_2 = "user2@manywords.fr";
const USER_NOT_FOUND = "user2NotFound@manywords.fr";

let db: typeof Mongoose;

describe("Server - e2e - user", () => {
  beforeAll(async () => {
    db = await getDbConnection();
  });

  afterAll(async () => {
    await User.deleteMany({
      email: {
        $in: [USER_1, USER_2],
      },
    });
    await db.connection.close();
  });

  // -----------------     BASIC AUTHORIZATION LOGIC    ------------------
  it("should get a new user after its first login, provided a valid token", async () => {
    // get a valid token first for a new user
    const accessToken = await getAccessTokenForUser(USER_1);
    const authenticatedLearnClient = getAuthenticatedLearnClient(accessToken);
    const userData: ApolloQueryResult<Query> = await authenticatedLearnClient.query(
      {
        query: USER_QUERY,
        fetchPolicy: "network-only",
      }
    );
    const {
      data: {
        user: {
          email,
          language,
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
    expect(language).toBeNull();
    expect(studiedLessons).toEqual(0);
    expect(studiedWords).toEqual(0);
    expect(topics).toEqual([]);
  });

  it("should return a 401 error if no token is provided", async () => {
    await expect(
      learnClient.query({
        query: USER_QUERY,
      })
    ).rejects.toThrowError("401");
  });

  it("should return a 401 error if the token is expired", async () => {
    const expiredToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTE1MzgzODEsInN1YiI6IjVlZGNmOWQ1NzBiYmUwMDJlZjgyZTk4MCIsInRva2VuVXNlIjoiYWNjZXNzIiwiaXNzIjoiTWFueVdvcmRzIiwiaWF0IjoxNTkxNTQwMTgxfQ.9i7g5JB0WM6Pov64ng4MTIFazQ3fmdmX9CL5b6EPVOw";
    const authenticatedLearnClient = getAuthenticatedLearnClient(expiredToken);
    await expect(
      authenticatedLearnClient.query({
        query: USER_QUERY,
      })
    ).rejects.toThrowError("401");
  });

  // this should not happen
  it("should return a 401 error if the user does not exist", async () => {
    const accessToken = await getAccessTokenForUser(USER_NOT_FOUND);
    await User.deleteOne({
      email: USER_NOT_FOUND,
    });
    const authenticatedLearnClient = getAuthenticatedLearnClient(accessToken);
    await expect(
      authenticatedLearnClient.query({
        query: USER_QUERY,
      })
    ).rejects.toThrowError("401");
  });

  // ----------------------     USER TESTS     ------------------
  it("should get user language", async () => {
    const accessToken = await getAccessTokenForUser(USER_2);
    const authenticatedLearnClient = getAuthenticatedLearnClient(accessToken);
    const chosenLanguage = "french";
    await User.findOneAndUpdate(
      { email: USER_2 },
      { language: chosenLanguage }
    );
    const userData: ApolloQueryResult<Query> = await authenticatedLearnClient.query(
      {
        query: GET_USER_LANGUAGE,
        fetchPolicy: "network-only",
      }
    );
    const language = userData?.data?.user?.language;
    expect(language).toEqual(chosenLanguage);
  });

  // implement and test set language mutation
  // it should delete the user
});
