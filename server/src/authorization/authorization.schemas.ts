import { gql } from "apollo-server-express";
import { Request, Response } from "express";

import authorizationController from "./authorization.controller";
import getRefreshToken from "./helpers/parseRefreshTokenCookie";
import validateEmail from "./validators/validateEmail";
import validateLoginInput from "./validators/validateLoginInput";

import {
  MutationResult,
  Tokens,
  LoginInput,
  QueryResult,
} from "../graphql/types";
import logger from "../utils/logger";

export const typeDefs = gql`
  enum AuthorizationErrors {
    emailNotFound
    internalError
    wrongTotp
  }

  extend type Query {
    getAccessTokenWebUser: QueryResult!
  }

  input LoginInput {
    email: String!
    totp: Int!
  }

  extend type Mutation {
    logInAppUser(loginInput: LoginInput!): Tokens!
    logInWebUser(loginInput: LoginInput!): LogInWithEmailMutationResponse!
    sendTotpToLogIn(email: String!): SendTotpToLogInMutationResponse!
    sendTotpToVerifyEmail(
      email: String!
    ): SendTotpToVerifyEmailMutationResponse! @loggedIn
  }

  type MutationResult {
    success: Boolean!
  }

  type QueryResult {
    success: Boolean!
  }

  type LogInWithEmailMutationResponse {
    reason: AuthorizationErrors
    success: Boolean!
  }

  type SendTotpToLogInMutationResponse {
    reason: AuthorizationErrors
    success: Boolean!
  }

  type SendTotpToVerifyEmailMutationResponse {
    reason: AuthorizationErrors
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
      const refreshToken = await getRefreshToken(req);
      if (!refreshToken) {
        logger.error(`[getAccessTokenWebUser] - no refresh token`);
        return { success: false };
      }
      try {
        await authorizationController.getAccessTokenWebUser(res, refreshToken);
        return { success: true };
      } catch (error) {
        logger.error(`[getAccessTokenWebUser] - ${error}`);
        return { success: false };
      }
    },
  },
  Mutation: {
    logInAppUser: async (
      parent: Record<string, unknown>,
      { loginInput }: { loginInput: LoginInput }
    ): Promise<Tokens> => {
      validateLoginInput(loginInput);
      return authorizationController.logInAppUser(loginInput);
    },
    // TODO: replace logInWebUser
    logInWebUser: async (
      parent: Record<string, unknown>,
      { loginInput }: { loginInput: LoginInput },
      { res }: { res: Response }
    ): Promise<MutationResult> => {
      validateLoginInput(loginInput);
      try {
        await authorizationController.logInWebUser(res, loginInput);
        return { success: true };
      } catch (error) {
        logger.error(`[logInWebUser] - ${error}`);
        return { success: false };
      }
    },
    sendTotpToLogIn: async (
      parent: Record<string, unknown>,
      { email }: { email: string },
      { req }: { req: Request }
    ): Promise<MutationResult> => {
      // TODO: proper return response on failed validation
      validateEmail(email);
      return authorizationController.sendTotpToLogin(req.ctx.user.id, email);
    },
    sendTotpToVerifyEmail: async (
      parent: Record<string, unknown>,
      { email }: { email: string },
      { req }: { req: Request }
    ): Promise<MutationResult> => {
      validateEmail(email);
      return authorizationController.sendTotpToVerifyEmail(
        email,
        req.ctx.user.id
      );
    },
  },
};
