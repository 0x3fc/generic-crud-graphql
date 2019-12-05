import { UserFactory } from "../../../src/factories/UserFactory";
import { Token } from "../../../src/utils/Token";
import { JWT_REGEX } from "../../utils/regex";
import { call } from "../../utils/utils";

describe("AuthResolver :: Login", () => {
  it("login successfully", async () => {
    const username = "username";
    const email = "email@example.com";
    const password = "password";
    const now = Date.prototype.unix();

    const user = await new UserFactory().create({ username, email, password });

    const source = `mutation($payload: LoginInput!) {
      login(payload: $payload) {
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
        password,
      },
    };

    const cookie = (tokenName: string, token: string) => {
      expect(tokenName).toBe("token");
      expect(Token.decode(token).id).toBe(user.id);
      expect(() => Token.verifyAndDecode(token)).not.toThrow();
    };

    const contextValue = { res: { cookie } };

    const res = await call({ source, variableValues, contextValue });

    expect(res).toMatchObject({
      data: {
        login: {
          id: user.id,
          username,
          email,
          token: expect.stringMatching(JWT_REGEX),
          createdAt: expect.any(Number),
          updatedAt: expect.any(Number),
        },
      },
    });

    const { id, token, createdAt, updatedAt } = res.data!.login;

    expect(id).toBe(user.id);
    expect(() => Token.verifyAndDecode(token)).not.toThrow();
    expect(createdAt).toBeGreaterThanOrEqual(now);
    expect(updatedAt).toBeGreaterThanOrEqual(now);
    expect(createdAt).toEqual(updatedAt);
  });
});
