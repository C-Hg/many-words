import { ApolloServer, makeExecutableSchema } from "apollo-server-express";
import { Response, Request } from "express";

import {
  typeDefs as authorization,
  resolvers as authorizationResolvers,
} from "../authorization/authorization.schemas";

// Build the global schema by merging concern-based separated typeDefs and resolvers
const schema = makeExecutableSchema({
  typeDefs: [authorization],
  resolvers: authorizationResolvers,
});

const authorizationServer = new ApolloServer({
  schema,
  context: ({ req, res }): { req: Request; res: Response } => ({ req, res }),
});

export default authorizationServer;
