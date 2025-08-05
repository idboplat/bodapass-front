import ky from "ky";

export const frontApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_FRONT_URL,
  hooks: {
    beforeRequest: [(request) => {}],
    beforeRetry: [],
    afterResponse: [],
    beforeError: [
      async (error) => {
        try {
          const body = await error.response.json<{ message?: string }>();
          if (body.message) {
            error.message = decodeURIComponent(body.message || "FCM992");
          }
        } catch (error) {
          console.error("[CLIENT] ky parseError", error);
        } finally {
          return error;
        }
      },
    ],
  },
});

export const proxyApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_FRONT_URL,
  hooks: {
    beforeRequest: [(request) => {}],
    beforeRetry: [],
    afterResponse: [],
    beforeError: [
      async (error) => {
        try {
          const body = await error.response.json<{ msg?: string }>();
          if (body.msg) {
            error.message = decodeURIComponent(body.msg || "FCM992");
          }
        } catch (error) {
          console.error("[PROXY] ky parseError", error);
        } finally {
          return error;
        }
      },
    ],
  },
});
