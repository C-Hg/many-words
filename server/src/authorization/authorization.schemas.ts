import { gql } from "apollo-server-express";
import { Response } from "express";

import authorizationController from "./authorization.controller";

import { Result, Tokens, LoginInput } from "../graphql/authorization.types";

export const typeDefs = gql`
  type Query {
    appLogin(loginInput: LoginInput!): Tokens!
    getAccessToken(refreshToken: String!): String!
    sendTotp(email: String!): Result!
  }

  input LoginInput {
    email: String!
    totp: Int!
  }

  type Mutation {
    createAppUser: Tokens!
    createWebUser: Result!
  }

  type Result {
    success: Boolean!
  }

  type Tokens {
    accessToken: String!
    error: String
    refreshToken: String!
  }
`;

export const resolvers = {
  Query: {
    appLogin: async (
      parent: {},
      { loginInput }: { loginInput: LoginInput }
    ): Promise<Tokens> => {
      return authorizationController.appLogin(loginInput);
    },
    getAccessToken: async (
      parent: {},
      { refreshToken }: { refreshToken: string }
    ): Promise<string> => {
      return authorizationController.getAccessToken(refreshToken);
    },
    sendTotp: async (
      parent: {},
      { email }: { email: string }
    ): Promise<Result> => {
      return authorizationController.sendTotp(email);
    },
    // webLogin: async (
    //   parent: {},
    //   { loginInput }: { loginInput: loginInput }
    // ): Promise<Tokens> => {
    //   return authorizationController.webLogin(loginInput);
    // },
  },
  Mutation: {
    createAppUser: async (): Promise<Tokens> => {
      return authorizationController.createAppUser();
    },
    createWebUser: async (
      parent: {},
      arg: {},
      { res }: { res: Response }
    ): Promise<Tokens> => {
      return authorizationController.createWebUser(res);
    },
  },
};
