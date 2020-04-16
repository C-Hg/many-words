import { ApolloServer, mergeSchemas } from "apollo-server-express";
import { Response, Request } from "express";

import exerciseSchema from "../exercises/exercise.schemas";
import userSchema from "../user/user.schemas";

// Build the global schema by merging concern-based separated schemas
export const schema = mergeSchemas({
  schemas: [exerciseSchema, userSchema],
});

const server = new ApolloServer({
  schema,
  context: ({ req, res }: { req: Request; res: Response }) => ({ req, res }),
});

export default server;
