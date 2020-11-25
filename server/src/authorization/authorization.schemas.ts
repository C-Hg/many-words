import { gql } from "apollo-server-express";
import { Request, Response } from "express";

import authorizationController from "./authorization.controller";
import validateEmail from "./validators/validateEmail";
import validateLoginInput from "./validators/validateLoginInput";

import {
  MutationResult,
  Tokens,
  LoginInput,
  QueryResult,
} from "../graphql/types";
import logger from "../utils/logger";
import getRefreshToken from "./helpers/parseRefreshTokenCookie";

export const typeDefs = gql`
  extend type Query {
    getAccessTokenWebUser: QueryResult!
  }

  input LoginInput {
    email: String!
    totp: Int!
  }

  extend type Mutation {
    createAppUser: Tokens!
    createWebUser: MutationResult!
    logInAppUser(loginInput: LoginInput!): Tokens!
    logInWebUser(loginInput: LoginInput!): MutationResult!
    sendTotp(email: String!): MutationResult!
  }

  type MutationResult {
    success: Boolean!
  }

  type QueryResult {
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
    getAccessTokenWebUser: async (
      parent: Record<string, unknown>,
      arg: Record<string, unknown>,
      { req, res }: { req: Request; res: Response }
    ): Promise<QueryResult> => {
      const refreshToken = await getRefreshToken(req)
      if (!refreshToken) {
        logger.error(`[getAccessTokenWebUser] - no refresh token`);
        return { success: false };
      }
      try {
        await authorizationController.getAccessTokenWebUser(
          res,
          refreshToken
        );
        return { success: true };
      } catch (error) {
        logger.error(`[getAccessTokenWebUser] - ${error}`);
        return { success: false };
      }
    },
  },
  Mutation: {
    createAppUser: async (): Promise<Tokens> => {
      return authorizationController.createAppUser();
    },
    createWebUser: async (
      parent: Record<string, unknown>,
      arg: Record<string, unknown>,
      { res }: { res: Response }
    ): Promise<MutationResult> => {
      return authorizationController.createWebUser(res);
    },
    logInAppUser: async (
      parent: Record<string, unknown>,
      { loginInput }: { loginInput: LoginInput }
    ): Promise<Tokens> => {
      validateLoginInput(loginInput);
      return authorizationController.logInAppUser(loginInput);
    },
    logInWebUser: async (
      parent: Record<string, unknown>,
      { loginInput }: { loginInput: LoginInput },
      { res }: { res: Response }
    ): Promise<MutationResult> => {
      validateLoginInput(loginInput);
      return authorizationController.logInWebUser(res, loginInput);
    },
    sendTotp: async (
      parent: Record<string, unknown>,
      { email }: { email: string }
    ): Promise<MutationResult> => {
      validateEmail(email);
      return authorizationController.sendTotp(email);
    },
  },
};
