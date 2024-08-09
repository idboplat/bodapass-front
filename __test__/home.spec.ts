import { test, expect } from "@playwright/test";
import * as fs from "fs/promises";
import path from "path";

const STORAGE_PATH = path.resolve(__dirname, "./state.json");

test.beforeAll(async () => {
  fs.readFile(STORAGE_PATH, "utf-8").catch(async () => {
    console.log("state.json 파일을 생성합니다.");
    await fs.writeFile(STORAGE_PATH, "{}", "utf-8");
  });
});

test.describe.configure({ mode: "serial" }); // 모든 테스트를 직렬로 실행

test.describe("홈 페이지 테스트", () => {
  test("로그인 테스트", async ({ browser }) => {
    await fs.writeFile(STORAGE_PATH, "{}", "utf-8");
    console.log("세션 초기화");

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("/");
    await expect(page).toHaveURL(/\/login/);

    await page.fill("input#loginFormEmail", "admin@24700000");
    await page.fill("input#loginFormPw", "1234");

    const emailValue = await page.inputValue("input#loginFormEmail");
    expect(emailValue).toBe("admin@24700000");

    const pwValue = await page.inputValue("input#loginFormPw");
    expect(pwValue).toBe("1234");

    await page.press("input#loginFormPw", "Enter");

    await page.waitForURL("**/G1/**");
    await expect(page).toHaveURL(/\/G1/);

    await context.storageState({ path: STORAGE_PATH });
  });

  test("세션 유지 테스트", async ({ browser }) => {
    const context = await browser.newContext({ storageState: STORAGE_PATH });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page).toHaveURL(/\/G1/);
  });
});
