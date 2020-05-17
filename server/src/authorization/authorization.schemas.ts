import { gql } from "apollo-server-express";
import { Request } from "express";

import authorizationController from "./authorization.controller";

import { Result, Tokens } from "../graphql/authorization.types";

export const typeDefs = gql`
  type Query {
    getAccessToken(refreshToken: String!): String!
    loginWithTotp(email: String!): Result!
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
    loginWithTotp: (parent: {}, { email }: { email: string }): Result => {
      return authorizationController.loginWithTOTP(email);
    },
  },
  Mutation: {
    createUser: async (): Promise<Tokens> => {
      return authorizationController.createUser();
    },
  },
};
