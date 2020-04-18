import { gql } from "apollo-server-express";
import { Request } from "express";

import { User } from "../graphql/types";

export const typeDefs = gql`
  type Query {
    user: User
  }

  type User {
    _id: String!
    email: String!
  }
`;

export const resolvers = {
  Query: {
    user: (parent: {}, args: {}, { req }: { req: Request }): User => {
      if (!req.user) {
        throw new Error("user is undefined");
      }
      return req.user;
    },
  },
};
