import z from "zod";

// Nullish 문자열을 빈 문자열로 변환하는 스키마
export const nullishString = z
  .string()
  .nullish()
  .transform((v) => v ?? "");

// "true"/"false" 문자열을 boolean으로 변환하는 스키마
export const nullishBooleanString = z
  .string()
  .nullish()
  .transform((v) => v === "true");

export const nullishBsTp = z
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
const nullishNumberString = z
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
const nullishDateString = z
  .string()
  .nullish()
  .transform((val, ctx) => {
    if (!val) return "";

    if (val.length !== 8) {
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

export const clovaRequestDto = z.object({
  image: z.instanceof(File),
  type: z.enum(["idCard", "passport"]),
  name: z.string(),
  requestId: z.string(),
});
