import {
  AuthenticationError,
  SchemaDirectiveVisitor,
} from "apollo-server-express";
import { GraphQLField, defaultFieldResolver } from "graphql";

import ApolloContext from "./ApolloContext.interface";

class AuthDirective extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field: GraphQLField<never, never>): any {
    const originalResolve = field.resolve || defaultFieldResolver;

    field.resolve = function (...args) {
      const context = args[2] as ApolloContext;
      const user = context?.req?.ctx?.user;

      if (!user) {
        throw new AuthenticationError(`Disconnected`);
      }

      return originalResolve.apply(this, args);
    };
  }
}

export default AuthDirective;
