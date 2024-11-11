import LoginForm from "./LoginForm";
import { renderWithClient } from "@/__test__/__mock__/Config";
import { usePathname } from "next/navigation";

describe("로그인 페이지 테스트", () => {
  (usePathname as jest.Mock).mockImplementation(() => "/login");

  test("로그인 폼 랜더링", () => {
    const dom = renderWithClient(<LoginForm />, { session: null, sidebar: true, fiat: "KRW" });
    const label = dom.getByText("아이디");
    expect(label).toBeInTheDocument();
  });
});
