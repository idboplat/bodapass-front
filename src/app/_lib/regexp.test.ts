import * as module from "./regexp";

describe("정규표현식 테스트", () => {
  test("공백삭제 테스트", () => {
    expect(module.removeBlank(" 1 2 3 4 5 6 ")).toBe("123456");
    expect(module.removeBlank("123 456")).not.toBe("123 456");
  });

  test("숫자외에 모두 삭제 테스트", () => {
    expect(module.replaceToNumber(" 1 2 3 4 5 6 ")).toBe("123456");
    expect(module.replaceToNumber("1 2 3 4 5 6 ")).not.toBe("1 2 3 4 5 6 ");
  });

  test("전화번호 형식으로 변경 테스트", () => {
    expect(module.replaceToTelNumber("01012345678")).toBe("010-1234-5678");
    expect(module.replaceToTelNumber("0212345678")).toBe("02-1234-5678");
    expect(module.replaceToTelNumber("010123456789")).toBe("010123456789");
    expect(module.replaceToTelNumber("010123456")).toBe("010123456");
    expect(module.replaceToTelNumber("01012345678")).not.toBe("01012345678");
  });

  test("소수인지 검증하는 정규표현식", () => {
    expect(module.checkIsDecimal("0.123")).toBe(true);
    expect(module.checkIsDecimal("0")).toBe(true);
    expect(module.checkIsDecimal(".123")).toBe(false);
    expect(module.checkIsDecimal("123.")).toBe(false);
    expect(module.checkIsDecimal("123..")).toBe(false);
    expect(module.checkIsDecimal("123..1")).toBe(false);
    expect(module.checkIsDecimal("123.456.")).toBe(false);
    expect(module.checkIsDecimal("123.456.789")).toBe(false);
  });

  test("소수점 길이 검증", () => {
    expect(
      module.checkAmount({
        amount: "123.456",
        maximumNumberLength: 3,
        maximumDecimalLength: 3,
      }),
    ).toBe(true);

    expect(
      module.checkAmount({
        amount: "123.456",
        maximumNumberLength: 2,
        maximumDecimalLength: 3,
      }),
    ).toBe(false);

    expect(
      module.checkAmount({
        amount: "123.456",
        maximumNumberLength: 3,
        maximumDecimalLength: 2,
      }),
    ).toBe(false);
  });

  test("이메일 정규식 테스트", () => {
    expect(module.checkEmail("admin@naver.com")).toBe(true);
    expect(module.checkEmail("admin@naver")).toBe(false);
    expect(module.checkEmail("adminnaver.com")).toBe(false);
    expect(module.checkEmail("admin@naver.co.kr")).toBe(true);
  });

  test("콤마 추가 테스트", () => {
    expect(module.addComma("1")).toBe("1");
    expect(module.addComma("123456789")).toBe("123,456,789");
    expect(module.addComma("1234567890")).toBe("1,234,567,890");
  });

  test("회사명 테스트", () => {
    expect(module.checkCorpNm(" ")).toBe(true);
    expect(module.checkCorpNm("")).toBe(false);
  });

  test("비밀번호 테스트", () => {
    expect(module.checkPassword(" ")).toBe(false);
    expect(module.checkPassword("")).toBe(false);
  });

  test("영문, 숫자, 특수문자 입력 테스트", () => {
    expect(module.checkEnNumSp(" ")).toBe(false);
    expect(module.checkEnNumSp("")).toBe(false);
  });
});
