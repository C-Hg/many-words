import { gql } from "apollo-server-express";
import { Request } from "express";

import { User } from "../graphql/types";
import logger from "../utils/logger";

export const typeDefs = gql`
  directive @loggedIn on FIELD_DEFINITION

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
  Query: {
    user: (
      parent: Record<string, unknown>,
      args: Record<string, unknown>,
      { req }: { req: Request }
    ): User => {
      logger.debug(`[user] resolver - get user ${req.ctx.user.id}`);
      return req.ctx.user;
    },
  },
};
