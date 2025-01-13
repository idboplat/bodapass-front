declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: "development" | "production" | "test";
      readonly TZ?: string;

      readonly WAS_HTTP_URL: string;
      readonly AUTH_ACCESS_SECRET: string;
      readonly AUTH_REFRESH_SECRET: string; 
      readonly NEXT_PUBLIC_FRONT_URL: string;

      // dev-tools
      readonly NEXT_PUBLIC_ENABLE_REACT_QUERY_DEVTOOLS?: "true" | "false";

      // aws credentials
      readonly AWS_REGION: string;
      readonly AWS_ACCESS: string;
      readonly AWS_SECRET: string;
      readonly AWS_BUCKET_NAME: string;

      // clova credentials
      readonly CLOVA_SECRET: string;
    }
  }
}

export {};
