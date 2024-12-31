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
  userId: nullishString,
  enabled: nullishBooleanString,
});

export const adminlistDto = z.object({
  adminId: nullishString,
  adminName: nullishString,
  enabled: nullishBooleanString,
});

export const orderStatusDto = z.object({
  corpCd: nullishString,
  userId: nullishString,
  instCd: nullishString,
  bsTp: nullishBsTp,
  orderNumber: nullishNumberString,
  startDd: nullishDateString,
  endDd: nullishDateString,
  enabled: nullishBooleanString,
});

export const openOrderStatusDto = z.object({
  corpCd: nullishString,
  userId: nullishString,
  instCd: nullishString,
  bsTp: nullishBsTp,
  orderNumber: nullishNumberString,
  startDd: nullishDateString,
  endDd: nullishDateString,
  enabled: nullishBooleanString,
});

export const pnlStatusDto = z.object({
  corpCd: nullishString,
  instCd: nullishString,
  bsTp: nullishBsTp,
  startDd: nullishDateString,
  endDd: nullishDateString,
  enabled: nullishBooleanString,
});

export const positionStatusDto = z.object({
  corpCd: nullishString,
  userId: nullishString,
  instCd: nullishString,
  bsTp: nullishBsTp,
  enabled: nullishBooleanString,
});

export const tradeStatusDto = z.object({
  corpCd: nullishString,
  userId: nullishString,
  instCd: nullishString,
  bsTp: nullishBsTp,
  orderNumber: nullishNumberString,
  startDd: nullishDateString,
  endDd: nullishDateString,
  enabled: nullishBooleanString,
});

export const deployDto = z.object({});

export const b2bDto = z.object({});

export const b2bConsignDto = z.object({});

export const b2cDto = z.object({});

export const agentStatusDto = z.object({});

export type TUserlistDto = z.infer<typeof userlistDto>;
export type TAdminlistDto = z.infer<typeof adminlistDto>;
export type TOrderStatusDto = z.infer<typeof orderStatusDto>;
export type TOpenOrderStatusDto = z.infer<typeof openOrderStatusDto>;
export type TPnlStatusDto = z.infer<typeof pnlStatusDto>;
export type TPositionStatusDto = z.infer<typeof positionStatusDto>;
export type TTradeStatusDto = z.infer<typeof tradeStatusDto>;
export type TDeployDto = z.infer<typeof deployDto>;
export type TB2bDto = z.infer<typeof b2bDto>;
export type TB2bConsignDto = z.infer<typeof b2bConsignDto>;
export type TB2cDto = z.infer<typeof b2cDto>;
export type TAgentStatusDto = z.infer<typeof agentStatusDto>;
