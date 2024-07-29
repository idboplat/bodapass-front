import { act, fireEvent, render, screen } from "@testing-library/react";
import Counter from "./Counter";

describe("Counter UI", () => {
  test("카운터 페이지 스냅샷 렌더 테스트", () => {
    const counterPage = render(<Counter />);
    expect(counterPage).toMatchSnapshot();
  });

  const findTexts = [
    { id: "plusBtn", value: "+", type: "button" },
    { id: "doubleBtn", value: "x2", type: "button" },
    { id: "halfBtn", value: "/2", type: "button" },
    { id: "minusBtn", value: "-", type: "button" },
  ];

  test("카운트 값 찾고 존재하는지 확인", () => {
    render(<Counter />);

    const countEl = screen.getByTestId("count");

    expect(countEl).toBeTruthy();
  });

  test("카운터 관련 액션 버튼 찾고 존재하는지 확인", () => {
    render(<Counter />);

    findTexts.forEach(({ value }) => {
      expect(screen.getByText(value)).toBeTruthy();
    });
  });

  test("카운터 액션 버튼에 따른 카운터 값 정상반응 확인", async () => {
    render(<Counter />);

    expect(await screen.findByText(0)).toBeTruthy();

    for (const { id, value, type } of findTexts) {
      switch (id) {
        case "plusBtn":
          clickButton({ type, value });
          expect(await screen.findByText(1)).toBeTruthy();
          break;
        case "doubleBtn":
          clickButton({ type, value });
          expect(await screen.findByText(2)).toBeTruthy();
          break;
        case "halfBtn":
          clickButton({ type, value });
          expect(await screen.findByText(1)).toBeTruthy();
          break;
        case "minusBtn":
          clickButton({ type, value });
          expect(await screen.findByText(0)).toBeTruthy();
          break;
      }
    }
  });

  test("카운터 액션 버튼에 따른 카운터 값 정상반응 확인 again", async () => {
    render(<Counter />);

    expect(await screen.findByText(0)).toBeTruthy();

    for (const { id, value, type } of findTexts) {
      switch (id) {
        case "plusBtn":
          clickButton({ type, value });
          expect(await screen.findByText(1)).toBeTruthy();
          break;
        case "doubleBtn":
          clickButton({ type, value });
          expect(await screen.findByText(2)).toBeTruthy();
          break;
        case "halfBtn":
          clickButton({ type, value });
          expect(await screen.findByText(1)).toBeTruthy();
          break;
        case "minusBtn":
          clickButton({ type, value });
          expect(await screen.findByText(0)).toBeTruthy();
          break;
      }
    }
  });
});

const clickButton = async ({ type, value }: { type: string; value: string }) => {
  await act(async () => {
    fireEvent.click(await screen.findByRole(type, { name: value }));
  });
};
