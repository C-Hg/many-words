import { Request, Response } from "express";

interface ApolloContext {
  req: Request;
  res: Response;
}
export default ApolloContext;
