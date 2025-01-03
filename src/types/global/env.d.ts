declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: "development" | "production" | "test";
      readonly TZ?: string;

      // vercel env  - https://vercel.com/docs/projects/environment-variables/system-environment-variables
      readonly NEXT_PUBLIC_VERCEL_ENV: "production" | "preview" | "development";
      /** *.vercel.app */
      readonly NEXT_PUBLIC_VERCEL_URL: string;
      /** main | stg | dev | ...etc */
      readonly NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG: string;

      /** @Example - http://localhost:3000 */
      readonly NEXTAUTH_URL: string;
      readonly NEXTAUTH_SECRET: string;

      // public
      /** @Example - http://localhost:3000 */
      readonly NEXT_PUBLIC_FRONT_URL: string;

      // api
      readonly WAS_HTTP_URL: string;

      // dev-tools
      readonly NEXT_PUBLIC_ENABLE_REACT_QUERY_DEVTOOLS?: "true" | "false";

      // aws credentials
      readonly AWS_REGION: string;
      readonly AWS_ACCESS_KEY: string;
      readonly AWS_SECRET_KEY: string;
      readonly AWS_BUCKET_NAME: string;

      // clova credentials
      readonly CLOVA_SECRET_KEY: string;
    }
  }
}

export {};
