import { AuthChecker } from "type-graphql";
import { Token } from "../utils/Token";
import { IContext } from "./Context";

export const authChecker: AuthChecker<IContext> = ({ context }) => {
  const token = context.req.headers.authorization;
  if (!token) {
    return false;
  }
  Token.verifyAndDecode(token);
  return true;
};
