import { gql } from "apollo-server-express";
import { Request } from "express";

import { User } from "../graphql/types";
import logger from "../logger";

export const typeDefs = gql`
  type Query {
    user: User
  }

  type User {
    #_id: ObjectId added via User interface
    id: ID # cast to string with codegen
    email: String!
  }
`;

export const resolvers = {
  Query: {
    user: (parent: {}, args: {}, { req }: { req: Request }): User => {
      if (!req.user) {
        logger.error("user is undefined");
        throw new Error("user is undefined");
      }
      return req.user;
    },
  },
};
