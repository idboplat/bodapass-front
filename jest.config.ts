//nextjs.org/docs/app/building-your-application/testing/jest
import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  setupFiles: ["<rootDir>/jest.polyfills.js"],
  testMatch: ["**/?(*.)+(test).[jt]s?(x)"], // 테스트 파일 패턴 설정
  coverageProvider: "v8",
  testEnvironment: "jsdom",
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
    "^next/navigation$": "<rootDir>/src/__test__/__mock__/next/navigation.ts",
  },
  // silent: false, // true: 콘솔로그를 끈다.
  testEnvironmentOptions: {
    // https://github.com/mswjs/msw/issues/1786/
    customExportConditions: [""],
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
// https://stackoverflow.com/questions/75261877/jest-encountered-an-unexpected-token-with-next-js-and-typescript-when-using-crea
const customCofig = async () => ({
  ...(await createJestConfig(config)()),
  transformIgnorePatterns: ["/node_modules/(?!uuid)/"],
});

export default customCofig;
