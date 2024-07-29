// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { mswServer } from "@/__test__/__mock__/msw";

beforeAll(() => {
  mswServer.listen();
});

afterEach(() => mswServer.resetHandlers());

afterAll(() => {
  mswServer.close();
});
