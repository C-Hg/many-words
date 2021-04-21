import { gql } from "apollo-server-express";
import { Request, Response } from "express";

import authorizationController from "./authorization.controller";
import { AuthorizationErrors } from "./constants";
import getRefreshToken from "./helpers/parseRefreshTokenCookie";
import validateEmail from "./validators/validateEmail";
import validateLoginInput from "./validators/validateLoginInput";

import {
  LoginInput,
  SendTotpToLogInMutationResponse,
  LogInWebUserMutationResponse,
  SendTotpToVerifyEmailMutationResponse,
  Tokens,
  GetAccessTokenQueryResult,
  VerifyEmailMutationResponse,
} from "../graphql/types";
import logger from "../utils/logger";

export const typeDefs = gql`
  enum AuthorizationErrors {
    emailAlreadyVerified
    emailNotFound
    expiredTotp
    internalError
    invalidEmailFormat
    invalidTotp
    noTotp
    wrongEmail
    wrongTotp
  }

  extend type Query {
    getAccessTokenWebUser: GetAccessTokenQueryResult!
  }

  input LoginInput {
    email: String!
    totp: Int!
  }

  extend type Mutation {
    logInAppUser(loginInput: LoginInput!): Tokens!
    logInWebUser(loginInput: LoginInput!): LogInWebUserMutationResponse!
    sendTotpToLogIn(email: String!): SendTotpToLogInMutationResponse!
    sendTotpToVerifyEmail(
      email: String!
    ): SendTotpToVerifyEmailMutationResponse! @loggedIn
    verifyEmail(verifyEmailInput: LoginInput!): VerifyEmailMutationResponse!
      @loggedIn
  }

  type GetAccessTokenQueryResult {
    success: Boolean!
  }

  type LogInWebUserMutationResponse {
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

  type VerifyEmailMutationResponse {
    reason: AuthorizationErrors
    success: Boolean!
  }
`;

export const resolvers = {
  Query: {
    getAccessTokenWebUser: async (
      parent: Record<string, unknown>,
      arg: Record<string, unknown>,
      { req, res }: { req: Request; res: Response }
    ): Promise<GetAccessTokenQueryResult> => {
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
    logInAppUser: (
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
    ): Promise<LogInWebUserMutationResponse> => {
      const error = validateLoginInput(loginInput);
      if (error) {
        return { reason: error, success: false };
      }
      try {
        return authorizationController.logInWebUser(res, loginInput);
      } catch (error) {
        logger.error(`[logInWebUser] - ${error}`);
        return { reason: AuthorizationErrors.internalError, success: false };
      }
    },
    sendTotpToLogIn: async (
      parent: Record<string, unknown>,
      { email }: { email: string }
    ): Promise<SendTotpToLogInMutationResponse> => {
      const error = validateEmail(email);
      if (error) {
        logger.error(`[sendTotpToLogIn] - ${error}`);
        return { reason: error, success: false };
      }
      return authorizationController.sendTotpToLogin(email);
    },
    sendTotpToVerifyEmail: async (
      parent: Record<string, unknown>,
      { email }: { email: string },
      { req }: { req: Request }
    ): Promise<SendTotpToVerifyEmailMutationResponse> => {
      const error = validateEmail(email);
      if (error) {
        logger.error(`[sendTotpToVerifyEmail] - ${error}`);
        return { reason: error, success: false };
      }
      return authorizationController.sendTotpToVerifyEmail(
        email,
        req.ctx.user.id
      );
    },
    verifyEmail: async (
      parent: Record<string, unknown>,
      { verifyEmailInput }: { verifyEmailInput: LoginInput },
      { req }: { req: Request }
    ): Promise<VerifyEmailMutationResponse> => {
      const error = validateLoginInput(verifyEmailInput);
      if (error) {
        return { reason: error, success: false };
      }
      return authorizationController.verifyEmail(
        req.ctx.user,
        verifyEmailInput
      );
    },
  },
};
