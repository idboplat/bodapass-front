import { addComma } from "./regexp";

export const sortDecimal = ({
  num,
  decimalLength,
  requireComma = false,
}: {
  num: string;
  decimalLength: number;
  requireComma?: boolean;
}) => {
  let result: string = "-";

  if (isNaN(Number(num))) return result; //숫자가 아닐경우 - 반환

  const [integerPart, decimalPart] = num.split(".");

  if (decimalLength <= 0) {
    return requireComma ? addComma(integerPart) : integerPart; //소수점이 필요없을때 정수부분만 반환
  }

  const currentDecimalLength = decimalPart?.length || 0;
  const decimalPlaces = decimalLength - currentDecimalLength;

  //소수점 처리
  if (decimalPlaces === 0) {
    //소수점이 딱 맞을때
    result = num;
  } else if (decimalPlaces < 0) {
    //소수점이 넘칠때
    result = num.substring(0, num.length + decimalPlaces);
  } else {
    //소수점이 부족할때
    const addZero = "0".repeat(decimalPlaces);
    result =
      currentDecimalLength === 0
        ? num + "." + addZero //소수점 자리수가 없으면 사이에 점을 찍어준다.
        : num + addZero;
  }

  if (result[0] === ".") {
    //.12와 같이 소수점 앞에 0없이 시작하는 경우 0을 추가해준다.
    result = "0" + result;
  }
  return requireComma ? addComma(result) : result;
};
