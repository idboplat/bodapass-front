import { http, HttpResponse } from "msw";
import { callMsw, mswServer } from "./msw";

describe("msw test", () => {
  test("handler test", async () => {
    const res = await callMsw();
    expect(res.greeting).toBe("hello there");
  });

  test("handler override test", async () => {
    mswServer.use(
      http.get("/greeting", () => {
        return HttpResponse.json({ greeting: "hello there, again" });
      }),
    );

    const res = await callMsw();

    expect(res.greeting).toBe("hello there, again");
  });

  test("handler reset test", async () => {
    const res = await callMsw();
    expect(res.greeting).toBe("hello there");
  });
});
