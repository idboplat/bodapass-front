/** 공백 모두 삭제 */
export const removeBlank = (string: string): string => {
  return string.replace(/\s/g, "");
};

/** 숫자 외에 모두 삭제 */
export const replaceToNumber = (string: string): string => {
  return string.replace(/[^0-9]/g, "");
};

export const replaceToTelNumber = (string: string): string => {
  const patten = /(^\d{2,3})(\d{4})(\d{4}$)/;
  return replaceToNumber(string).replace(patten, "$1-$2-$3");
};

/** 소수인지 검증하는 정규표현식 */
export const checkIsDecimal = (string: string): boolean => {
  return /^\d*\.?\d*$/.test(string);
};

/**
 *  소수점 앞에 필요없는 0을 제거하는 정규표현식
 *
 *  ex)
 *  00.23 => 0.23
 *  00 => 0
 */
export const deleteIntegerZero = (string: string) => {
  if (string === "0") return "0";
  if (string === "00") return "0";
  return string.replace(/^0+(?!\.)/, "");
};

/** 소수를 소수점 위아래로 길이검증 */
export const checkAmount = ({
  amount,
  maximumNumberLength,
  maximumDecimalLength,
}: {
  /** 소수점을 포함한 숫자전체 type string */
  amount: string;
  /** 소수점부터 위로 숫자의 길이, undefinde일때는 제한없이 입력가능 */
  maximumNumberLength?: number;
  /** 소수점부터 아래로 숫자의 길이, 0일때 소수점 입력도 방지 */
  maximumDecimalLength?: number;
}): boolean => {
  if (checkIsDecimal(amount) === false) {
    return false;
  }

  const splitAmount = amount.split(".");
  const [number, decimal] = splitAmount;

  if ((maximumDecimalLength === 0 || maximumDecimalLength === undefined) && /\./.test(amount)) {
    //maximumDecimalLength가 0이거나 없을때 소수점이 있으면 false
    return false;
  }

  if (splitAmount.length > 2) {
    //소수점이 두번 이상 들어가면 false
    return false;
  }

  if (splitAmount.length === 2 && (number === "" || number === undefined)) {
    //소수점이 맨 앞에 있으면 false
    return false;
  }

  if (maximumNumberLength !== undefined && number.length > maximumNumberLength) {
    //소수점 위 숫자가 maximumNumberLength보다 길때 false
    return false;
  }

  if (
    maximumDecimalLength !== undefined &&
    decimal !== undefined &&
    decimal.length > maximumDecimalLength
  ) {
    //소수점 아래 숫자가 maximumDecimalLength보다 길때 false
    return false;
  }

  return true;
};

export const checkPassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?!.*\s).{8,}$/;

  return passwordRegex.test(password);
};

/** email 정규식 */
export const checkEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
};

/** 입력값을 소수점을 기준으로 나누어 처리 */
export const addComma = (string: string) => {
  const parts = string.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

/** 14글자 string -> YYYY-MM-DD HH:MM:SS 형식으로 변환 */
export const stringToDateTime = (inputString: string) => {
  const formattedDate = `${inputString.slice(0, 4)}-${inputString.slice(4, 6)}-${inputString.slice(
    6,
    8,
  )} ${inputString.slice(8, 10)}:${inputString.slice(10, 12)}:${inputString.slice(12, 14)}`;
  return formattedDate;
};

/** YYYY-MM-DD 형식으로 변환 */
export const stringToDate = (inputString: string) => {
  if (inputString === "" || inputString === " ") return inputString;
  const formattedDate = `${inputString.slice(0, 4)}-${inputString.slice(4, 6)}-${inputString.slice(
    6,
    8,
  )}`;
  return formattedDate;
};

/** DD-MMM-YY HH.MM.SS.SSSSSS AM/PM -> YYYY-MM-DD HH:MM:SS 형식으로 변환 */
/**ex) 27-JUN-24 04.12.45.283920 PM ->  2024-06-27 16:12:45 */
export const convertToStandardDateTime = (dateString: string) => {
  // 주어진 문자열에서 날짜와 시간을 분리합니다.
  if (dateString === "" || dateString === " ") return dateString;
  const [datePart, timePart, period] = dateString.split(" ");

  // 날짜 부분을 분리하여 년, 월, 일로 나눕니다.
  const [day, month, year] = datePart.split("-");
  const monthMap: { [key: string]: string } = {
    JAN: "01",
    FEB: "02",
    MAR: "03",
    APR: "04",
    MAY: "05",
    JUN: "06",
    JUL: "07",
    AUG: "08",
    SEP: "09",
    OCT: "10",
    NOV: "11",
    DEC: "12",
  };
  const formattedMonth = monthMap[month];
  const formattedDate = `20${year}-${formattedMonth}-${day}`;

  // 시간 부분에서 밀리초를 제거하고 시, 분, 초로 나눕니다.
  const [hours, minutes, seconds] = timePart.split(".");

  // PM/AM을 처리하여 24시간 형식으로 변환합니다.
  let formattedHours = parseInt(hours);
  if (period === "PM" && formattedHours !== 12) {
    formattedHours += 12;
  } else if (period === "AM" && formattedHours === 12) {
    formattedHours = 0;
  }

  // 2자리로 맞추기 위해 앞에 0을 추가합니다.
  const formattedTime = `${formattedHours.toString().padStart(2, "0")}:${minutes}:${seconds}`;

  // 최종 형식으로 변환된 문자열을 반환합니다.
  return `${formattedDate} ${formattedTime}`;
};

/** 영문, 숫자, 특수문자만 입력 가능한 정규표현식 */
export const checkEnglishNumericSpecial = (string: string): boolean => {
  return /^[a-zA-Z0-9!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+$/.test(string);
};

/** 한글, 영문, 숫자만 입력 가능한 정규표현식 */
export const checkKoreanEnglishNumeric = (string: string): boolean => {
  return /^[가-힣a-zA-Z0-9]+$/.test(string);
};

/** 한글, 영문, 숫자, 특수문자만 입력 가능한 정규표현식 */
export const checkKoreanEnglishNumericSpecial = (string: string): boolean => {
  return /^[가-힣a-zA-Z0-9!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+$/.test(string);
};
