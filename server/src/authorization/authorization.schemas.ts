import { gql } from "apollo-server-express";

import authorizationController from "./authorization.controller";

import { Tokens } from "../graphql/authorization.types";

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
    createUser: async (): Promise<Tokens> => {
      return authorizationController.createUser();
    },
  },
};
