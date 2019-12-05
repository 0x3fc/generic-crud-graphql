import { UserFactory } from "../../../src/factories/UserFactory";
import { Token } from "../../../src/utils/Token";
import { JWT_REGEX } from "../../utils/regex";
import { call } from "../../utils/utils";

describe("AuthResolver :: Me", () => {
  it("get access token successfully", async () => {
    const username = "username";
    const email = "email@example.com";
    const password = "password";

    const user = await new UserFactory().create({ username, email, password });

    const source = `{ 
      me {
        id
        username
        email
        token
        createdAt
        updatedAt
      }
    }`;

    const cookie = (tokenName: string, token: string) => {
      expect(tokenName).toBe("token");
      expect(Token.decode(token).id).toBe(user.id);
      expect(() => Token.verifyAndDecode(token)).not.toThrow();
    };

    const contextValue = {
      userId: user.id,
      res: { cookie },
    };

    const res = await call({ source, contextValue });

    expect(res).toMatchObject({
      data: {
        me: {
          id: user.id,
          username,
          email,
          token: expect.stringMatching(JWT_REGEX),
          createdAt: expect.any(Number),
          updatedAt: expect.any(Number),
        },
      },
    });

    const { id, token } = res.data!.me;

    expect(id).toBe(user.id);
    expect(() => Token.verifyAndDecode(token)).not.toThrow();
  });
});
