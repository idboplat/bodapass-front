import { z } from "zod";

export type TSignInDto = z.infer<typeof signInDto>;
export const signInDto = z.object({
  externalId: z.string().min(1),
  password: z.string().min(1),
});

export type TCrewSignUpDto = z.infer<typeof crewSignUpDto>;
export const crewSignUpDto = z.object({
  externalId: z.string().min(1),
  userName: z.string().min(1).regex(/^\S+$/, "공백 없이 입력해주세요."),
  /** 이메일 1, 소셜 2, 전화번호 3 */
  loginTp: z.enum(["1", "2", "3"]),
  brkrId: z.string(), // 팀원에만, 반장 아이디
  password: z.string().min(1),
  passwordConfirm: z.string().min(1),
  address: z.string().min(1),
  addressDetail: z.string().min(1),
  tel1: z.string().min(1),
  tel2: z.string().min(1),
  tel3: z.string().min(1),
  contryCode: z.string().min(1),
  zipCode: z.string().min(1),
});

export type TLeaderSignUpDto = z.infer<typeof leaderSignUpDto>;
export const leaderSignUpDto = z.object({
  externalId: z.string().min(1),
  userName: z.string().min(1).regex(/^\S+$/, "공백 없이 입력해주세요."),
  /** 이메일 1, 소셜 2, 전화번호 3 */
  loginTp: z.enum(["1", "2", "3"]),
  password: z.string().min(1),
  passwordConfirm: z.string().min(1),
  address: z.string().min(1),
  addressDetail: z.string().min(1),
  tel1: z.string().min(1),
  tel2: z.string().min(1),
  tel3: z.string().min(1),
  contryCode: z.string().min(1),
  zipCode: z.string().min(1),
});
