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
      readonly NEXT_PUBLIC_API_URL: string;

      // server-only
      readonly NEXT_API_URL: string;

      // dev-tools
      readonly NEXT_PUBLIC_ENABLE_REACT_QUERY_DEVTOOLS?: "true" | "false";
    }
  }
}

export {};
