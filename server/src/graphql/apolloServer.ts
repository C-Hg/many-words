import { ApolloServer, makeExecutableSchema } from "apollo-server-express";
import merge from "lodash.merge";

import ApolloContext from "./ApolloContext.interface";
import AuthDirective from "./authDirective";

import {
  typeDefs as authorization,
  resolvers as authorizationResolvers,
} from "../authorization/authorization.schemas";
import {
  typeDefs as exercise,
  resolvers as exerciseResolvers,
} from "../exercises/exercises.schemas";
import {
  typeDefs as stats,
  resolvers as statsResolvers,
} from "../stats/stats.schemas";
import {
  typeDefs as user,
  resolvers as userResolvers,
} from "../user/user.schemas";

// Build the global schema by merging concern-based separated typeDefs and resolvers
const schema = makeExecutableSchema({
  resolvers: merge(
    authorizationResolvers,
    exerciseResolvers,
    statsResolvers,
    userResolvers
  ),
  schemaDirectives: {
    loggedIn: AuthDirective,
  },
  typeDefs: [authorization, exercise, stats, user],
});

const apolloServer = new ApolloServer({
  schema,
  context: ({ req, res }): ApolloContext => ({ req, res }),
});

export default apolloServer;
