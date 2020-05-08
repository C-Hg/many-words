import { gql } from "apollo-server-express";
import { Request } from "express";

import withUser from "./utils/withUser";

import { User } from "../graphql/types";

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
      withUser(req);
      return req.ctx.user;
    },
  },
};
