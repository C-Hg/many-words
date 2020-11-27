import { gql } from "apollo-server-express";
import { Request } from "express";

import userService from "./user.service";

import { Languages, SetLanguageMutationResponse, User } from "../graphql/types";
import logger from "../utils/logger";

export const typeDefs = gql`
  directive @loggedIn on FIELD_DEFINITION

  extend type Mutation {
    setLanguage(language: Languages!): SetLanguageMutationResponse! @loggedIn
  }

  type SetLanguageMutationResponse {
    user: User
    success: Boolean!
  }

  type Query {
    user: User! @loggedIn
  }

  type User {
    id: ID!
    email: String!
    language: Languages
  }
`;

export const resolvers = {
  Mutation: {
    setLanguage: async (
      parent: Record<string, unknown>,
      { language }: { language: Languages },
      { req }: { req: Request }
    ): Promise<SetLanguageMutationResponse> => {
      const userId = req.ctx.user.id;
      logger.debug(`[setLanguage] ${language} for user ${userId}`);
      try {
        const user = await userService.setLanguage(userId, language);
        return { user, success: true };
      } catch (error) {
        logger.error(`[setLanguage] user ${userId} - ${error}`);
        return { success: false };
      }
    },
  },
  Query: {
    user: (
      parent: Record<string, unknown>,
      args: Record<string, unknown>,
      { req }: { req: Request }
    ): User => {
      logger.debug(`[user] get user ${req.ctx.user.id}`);
      return req.ctx.user;
    },
  },
};
