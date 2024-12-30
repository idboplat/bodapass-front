import z from "zod";

// Nullish 문자열을 빈 문자열로 변환하는 스키마
export const nullableString = z
  .string()
  .nullish()
  .transform((v) => v ?? "");

// "true"/"false" 문자열을 boolean으로 변환하는 스키마
export const nullableBooleanFromString = z
  .string()
  .nullish()
  .transform((v) => v === "true");

export const nullableBsTp = z
  .string()
  .nullish()
  .transform((val, ctx) => {
    const isValid = ["", "B", "S"].includes(val || "");

    if (!isValid) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "invalid input value",
      });

      return z.NEVER;
    }

    return val as "" | "B" | "S";
  });

// 빈 문자열 또는 숫자로 변환 가능한 문자열을 처리하는 스키마
const emptyOrNumberString = z
  .string()
  .nullish()
  .transform((val, ctx) => {
    if (!val) return ""; // 빈 문자열인 경우 그대로 반환

    if (isNaN(Number(val))) {
      // 숫자로 변환 불가능한 경우 에러 추가
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "invalid input format",
      });

      return z.NEVER; // 변환 실패 시 반환할 값 (Zod에서는 NEVER를 사용)
    }

    return val; // 숫자로 변환 가능한 경우 숫자 반환
  });

// 빈 문자열 또는 날짜 문자열을 처리하는 스키마
const empryOrDateString = z
  .string()
  .nullish()
  .transform((val, ctx) => {
    if (!val) return "";

    if (val.length !== 6) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "invalid input length",
      });

      return z.NEVER;
    }

    if (isNaN(Number(val))) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "invalid input format",
      });

      return z.NEVER;
    }

    return val;
  });

export const userlistDto = z.object({
  userId: nullableString,
  enabled: nullableBooleanFromString,
});

export const adminlistDto = z.object({
  adminId: nullableString,
  adminName: nullableString,
  enabled: nullableBooleanFromString,
});

export const orderStatusDto = z.object({
  corpCd: nullableString,
  userId: nullableString,
  instCd: nullableString,
  bsTp: nullableBsTp,
  orderNumber: emptyOrNumberString,
  startDd: empryOrDateString,
  endDd: empryOrDateString,
  enabled: nullableBooleanFromString,
});

export const openOrderStatusDto = z.object({
  corpCd: nullableString,
  userId: nullableString,
  instCd: nullableString,
  bsTp: nullableBsTp,
  orderNumber: emptyOrNumberString,
  startDd: empryOrDateString,
  endDd: empryOrDateString,
  enabled: nullableBooleanFromString,
});

export type TUserlistDto = z.infer<typeof userlistDto>;
export type TAdminlistDto = z.infer<typeof adminlistDto>;
export type TOrderStatusDto = z.infer<typeof orderStatusDto>;
export type TOpenOrderStatusDto = z.infer<typeof openOrderStatusDto>;
