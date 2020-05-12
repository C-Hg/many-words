import { gql } from "apollo-server-express";
import { Request } from "express";

import { User } from "../graphql/exercises.types";

export const typeDefs = gql`
  type Query {
    user: User
  }

  type User {
    id: ID!
    email: String!
  }
`;

export const resolvers = {
  Query: {
    user: (parent: {}, args: {}, { req }: { req: Request }): User => {
      return req.ctx.user;
    },
  },
};
