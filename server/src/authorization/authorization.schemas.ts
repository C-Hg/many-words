import { gql } from "apollo-server-express";
import { Response } from "express";

import authorizationController from "./authorization.controller";
import validateEmail from "./helpers/validators/validateEmail";
import validateLoginInput from "./helpers/validators/validateLoginInput";

import {
  MutationResult,
  Tokens,
  LoginInput,
} from "../graphql/authorization.types";

export const typeDefs = gql`
  type Query {
    getAccessToken(refreshToken: String!): String!
    logInAppUser(loginInput: LoginInput!): Tokens!
    logInWebUser(loginInput: LoginInput!): MutationResult!
    sendTotp(email: String!): MutationResult!
  }

  input LoginInput {
    email: String!
    totp: Int!
  }

  type Mutation {
    createAppUser: Tokens!
    createWebUser: MutationResult!
  }

  type MutationResult {
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
    logInAppUser: async (
      parent: {},
      { loginInput }: { loginInput: LoginInput }
    ): Promise<Tokens> => {
      validateLoginInput(loginInput);
      return authorizationController.logInAppUser(loginInput);
    },
    logInWebUser: async (
      parent: {},
      { loginInput }: { loginInput: LoginInput },
      { res }: { res: Response }
    ): Promise<MutationResult> => {
      validateLoginInput(loginInput);
      return authorizationController.logInWebUser(res, loginInput);
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
    ): Promise<MutationResult> => {
      validateEmail(email);
      return authorizationController.sendTotp(email);
    },
  },
  Mutation: {
    createAppUser: async (): Promise<Tokens> => {
      return authorizationController.createAppUser();
    },
    createWebUser: async (
      parent: {},
      arg: {},
      { res }: { res: Response }
    ): Promise<MutationResult> => {
      return authorizationController.createWebUser(res);
    },
  },
};
