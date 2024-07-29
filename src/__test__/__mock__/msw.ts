import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

export const handlers = [
  http.get("/greeting", async ({ request, params }) => {
    return HttpResponse.json({ greeting: "hello there" });
  }),
];

export const callMsw = async () => {
  const req = await fetch("/greeting");
  const res = await req.json();
  return res;
};

export const mswServer = setupServer(...handlers);
