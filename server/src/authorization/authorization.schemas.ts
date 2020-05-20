import { gql } from "apollo-server-express";

import authorizationController from "./authorization.controller";

import { Result, Tokens } from "../graphql/authorization.types";

export const typeDefs = gql`
  type Query {
    getAccessToken(refreshToken: String!): String!
    getTotp(email: String!): Result!
  }

  type Mutation {
    createUser: Tokens!
  }

  type Result {
    success: Boolean!
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
    // TODO: loginWithTotp
    getTotp: async (
      parent: {},
      { email }: { email: string }
    ): Promise<Result> => {
      return authorizationController.getTotp(email);
    },
  },
  Mutation: {
    createUser: async (): Promise<Tokens> => {
      return authorizationController.createUser();
    },
  },
};
