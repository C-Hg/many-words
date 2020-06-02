import { gql } from "apollo-server-express";
import { Response } from "express";

import authorizationController from "./authorization.controller";
import validateLoginInput from "./helpers/validateLoginInput";

import { Result, Tokens, LoginInput } from "../graphql/authorization.types";

export const typeDefs = gql`
  type Query {
    getAccessToken(refreshToken: String!): String!
    loginAppUser(loginInput: LoginInput!): Tokens!
    loginWebUser(loginInput: LoginInput!): Result!
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
    loginAppUser: async (
      parent: {},
      { loginInput }: { loginInput: LoginInput }
    ): Promise<Tokens> => {
      validateLoginInput(loginInput);
      return authorizationController.loginAppUser(loginInput);
    },
    loginWebUser: async (
      parent: {},
      { loginInput }: { loginInput: LoginInput }
    ): Promise<Tokens> => {
      validateLoginInput(loginInput);
      return authorizationController.loginWebUser(loginInput);
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
