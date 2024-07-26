//nextjs.org/docs/app/building-your-application/testing/jest
import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    "^@transaction/(.*)$": "<rootDir>/src/app/(web)/(afterLogin)/_component/transaction/$1",
    "^@log/(.*)$": "<rootDir>/src/app/(web)/(afterLogin)/_component/log/$1",
    "^@management/(.*)$": "<rootDir>/src/app/(web)/(afterLogin)/_component/management/$1",
    "^@order/(.*)$": "<rootDir>/src/app/(web)/(afterLogin)/_component/order/$1",
    "^@status/(.*)$": "<rootDir>/src/app/(web)/(afterLogin)/_component/status/$1",
    "^@user/(.*)$": "<rootDir>/src/app/(web)/(afterLogin)/_component/user/$1",
    "^@web/(.*)$": "<rootDir>/src/app/(web)/$1",
    "^@api/(.*)$": "<rootDir>/src/app/api/$1",
    "^@/(.*)$": "<rootDir>/src/$1",
    "^/(.*)$": "<rootDir>/$1",
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
