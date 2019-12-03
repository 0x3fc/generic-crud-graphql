import { ContextFunction } from "apollo-server-core";
import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import { Request, Response } from "express";
import { Token } from "../utils/Token";

export interface IContext {
  req: Request;
  res: Response;
  userId?: string;
}

export const context: ContextFunction<ExpressContext, object> = ({
  req,
  res,
}) => {
  const token = (req as Request).headers.authorization;

  let userId;
  if (token) {
    userId = Token.decode(token).id;
  }

  return { userId, req, res } as IContext;
};
