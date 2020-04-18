import { ApolloServer, makeExecutableSchema } from "apollo-server-express";
import { Response, Request } from "express";
import merge from "lodash.merge";

import {
  typeDefs as exercise,
  resolvers as exerciseResolvers,
} from "../exercises/exercise.schemas";
import {
  typeDefs as stats,
  resolvers as statsResolvers,
} from "../stats/stats.schemas";
import {
  typeDefs as user,
  resolvers as userResolvers,
} from "../user/user.schemas";

// Build the global schema by merging concern-based separated schemas
const schema = makeExecutableSchema({
  typeDefs: [exercise, stats, user],
  resolvers: merge(exerciseResolvers, statsResolvers, userResolvers),
});

const server = new ApolloServer({
  schema,
  context: ({ req, res }: { req: Request; res: Response }) => ({ req, res }),
});

export default server;
