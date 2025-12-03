import { z } from "zod";

export type TOCR = "idcard" | "driver" | "passport" | "passport-overseas" | "alien" | "alien-back";

export type TSignInDto = z.infer<typeof signInDto>;
export const signInDto = z.object({
  externalId: z.string().min(1),
  password: z.string().min(1),
});

export type TSignUpDto = z.infer<typeof signUpDto>;
export const signUpDto = z.object({
  // step 1
  cntryCd: z.string().min(1),
  brkrId: z.string(), // 팀원에만, 반장 아이디

  // step 2
  /** 주민번호 1, 운전면허증 2, 외국인등록증 3*/
  idTp: z.enum(["1", "2", "3"]),

  // step 3
  userNm: z.string().min(1).regex(/^\S+$/, "공백 없이 입력해주세요."),
  idNo1: z.string().min(1),
  idNo2: z.string().min(1),
  zipCd: z.string().min(1),
  addr: z.string().min(1),
  addrDtil: z.string().min(1),
  tel: z.string().min(1),

  // step 3
  externalId: z.string().min(1),
  password: z.string().min(1),
  passwordConfirm: z.string().min(1),

  //
  corpCd: z.string(),

  //
  emailAddr: z.string(),
});

export type TScannedResult = {
  id1: string;
  id2: string;
  idTp: "1" | "2" | "3";
  image: Blob;
  userNm: string;
};
