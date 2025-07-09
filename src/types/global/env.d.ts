declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: "development" | "production" | "test";
      readonly TZ?: string;

      readonly WAS_HTTP_URL: string;
      readonly AUTH_ACCESS_SECRET: string;
      readonly AUTH_REFRESH_SECRET: string;

      //  dev-tools
      readonly NEXT_PUBLIC_ENABLE_REACT_QUERY_DEVTOOLS?: "true" | "false";

      // aws credentials
      readonly AWS_ACCESS: string;
      readonly AWS_SECRET: string;
      readonly AWS_BUCKET_NAME: string;

      // clova credentials
      readonly CLOVA_SECRET: string;

      //vercel env  - https://vercel.com/docs/projects/environment-variables/system-environment-variables
      readonly NEXT_PUBLIC_VERCEL_ENV: "production" | "preview" | "development";
      readonly NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG: string; // main or dev

      readonly NEXT_PUBLIC_SENTRY_DSN?: string;
      readonly SENTRY_AUTH_TOKEN?: string;

      // nhn credentials
      readonly NHN_API_KEY: string;
      readonly NHN_APP_KEY: string;
      readonly NHN_SECRET_KEY: string;

      // useb credentials
      readonly USEB_API_KEY: string;
      readonly USEB_API_SECRET: string;
      readonly USEB_CLIENT_ID: string;
      readonly USEB_CLIENT_SECRET: string;
      readonly USEB_TOKEN: string;

      // kakao credentials
      readonly NEXT_PUBLIC_KAKAO_JS_KEY: string;
      readonly NEXT_PUBLIC_KAKAO_REST_API_KEY: string;
      readonly KAKAO_CLIENT_SECRET: string;
      readonly NEXT_PUBLIC_FRONT_URL: string;
    }
  }
}

export {};
