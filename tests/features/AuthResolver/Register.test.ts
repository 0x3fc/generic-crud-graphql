import { config } from "../../../src/config";
import { User } from "../../../src/models/User";
import { Token } from "../../../src/utils/Token";
import { JWT_REGEX, UUID_REGEX } from "../../utils/regex";
import { call } from "../../utils/utils";

describe("AuthResolver :: Register", () => {
  it("register successfully", async () => {
    const username = "username";
    const email = "email@example.com";
    const password = "password";
    const now = Date.prototype.unix();

    const source = `mutation($payload: RegisterInput!) {
      register(payload: $payload) {
        id
        username
        email
        token
        createdAt
        updatedAt
      }
    }`;

    const variableValues = {
      payload: {
        username,
        email,
        password,
      },
    };

    const cookie = (tokenName: string, token: string) => {
      expect(tokenName).toBe(config.jwt.cookieName);
      expect(() => Token.verifyAndDecode(token)).not.toThrow();
    };

    const contextValue = { res: { cookie } };

    const res = await call({ source, variableValues, contextValue });

    expect(res).toMatchObject({
      data: {
        register: {
          id: expect.stringMatching(UUID_REGEX),
          username,
          email,
          token: expect.stringMatching(JWT_REGEX),
          createdAt: expect.any(Number),
          updatedAt: expect.any(Number),
        },
      },
    });

    const { id, token, createdAt, updatedAt } = res.data!.register;

    expect(() => Token.verifyAndDecode(token)).not.toThrow();
    expect(createdAt).toBeGreaterThanOrEqual(now);
    expect(updatedAt).toBeGreaterThanOrEqual(now);
    expect(createdAt).toEqual(updatedAt);
    expect(async () => User.findOneOrFail(id)).not.toThrow();
  });
});
