import * as jwt from "jsonwebtoken";
import { config } from "../config";
import { ModelNotFoundError } from "../errors/ModelNotFoundError";
import { User } from "../models/User";

const JWT_SECRET = config.jwt.secret;
export const REFRESH_EXPIRE = config.jwt.refreshExpire;
export const ACCESS_EXPIRE = config.jwt.accessExpire;

export interface ITokenPayload {
  id: string;
  isRefresh: boolean;
  exp: number;
}

export class Token {
  static sign(user: User, isRefresh: boolean) {
    if (!user.hasId()) {
      throw new ModelNotFoundError();
    }

    return jwt.sign(
      {
        id: user.id,
        isRefresh,
        exp: REFRESH_EXPIRE + ((Date.now() / 1000) | 0),
      } as ITokenPayload,
      JWT_SECRET
    );
  }

  static signRefresh(user: User) {
    return Token.sign(user, true);
  }

  static signAccess(user: User) {
    return Token.sign(user, false);
  }

  static decode(token: string) {
    return jwt.decode(token) as ITokenPayload;
  }

  static verifyAndDecode(token: string) {
    return jwt.verify(token, JWT_SECRET) as ITokenPayload;
  }
}
