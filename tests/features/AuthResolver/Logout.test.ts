import { config } from "../../../src/config";
import { UserFactory } from "../../../src/factories/UserFactory";
import { call } from "../../utils/utils";

describe("AuthResolver :: Logout", () => {
  it("logout successfully", async () => {
    const user = await new UserFactory().create();

    const source = `mutation {
      logout
    }`;

    const cookie = (tokenName: string, token: string) => {
      expect(tokenName).toBe(config.jwt.cookieName);
      expect(token).toHaveLength(0);
    };

    const contextValue = { res: { cookie } };

    const res = await call({ source, contextValue });

    expect(res).toMatchObject({ data: { logout: true } });
  });
});
