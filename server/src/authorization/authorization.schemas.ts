import { gql } from "apollo-server-express";

import authorizationController from "./authorization.controller";

import { Tokens } from "../graphql/authorization.types";

export const typeDefs = gql`
  type Query {
    getAccessToken(refreshToken: String): String
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
  Query: {
    getAccessToken: async (
      parent: {},
      { refreshToken }: { refreshToken: string }
    ): Promise<string> => {
      return authorizationController.getAccessToken(refreshToken);
    },
  },
  Mutation: {
    createUser: async (): Promise<Tokens> => {
      return authorizationController.createUser();
    },
  },
};
