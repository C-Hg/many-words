import { gql } from "apollo-server-express";
import { Request } from "express";

import { Tokens } from "../graphql/authorization.types";
import authorizationController from "./authorization.controller";

export const typeDefs = gql`
  type Query {
    accessToken: String
  }

  type Mutation {
    createUser: Tokens
  }

  type Tokens {
    accessToken: String!
    refreshToken: String!
  }
`;

export const resolvers = {
  Mutation: {
    createUser: async (parent: {}, args: {}, { req }: { req: Request }): Promise<Tokens> => {
      return authorizationController.createUser()
    },
  }
}
