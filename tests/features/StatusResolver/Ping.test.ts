import { call } from "../../utils/utils";

describe("StatusResolver :: Ping", () => {
  it("ping successfully", async () => {
    const source = `{ping}`;
    const res = await call({ source });
    expect(res).toMatchObject({
      data: { ping: "pong" },
    });
  });
});
