import { TIdTp } from "@/types/common";
import { z } from "zod";

export type TOCR = "idcard" | "driver" | "passport" | "passport-overseas" | "alien" | "alien-back";

export type TSignInDto = z.infer<typeof signInDto>;
export const signInDto = z.object({
  externalId: z.string().min(1),
  password: z.string().min(1),
});

export type TSignUpDto = z.infer<typeof signUpDto>;
export const signUpDto = z.object({
  corpCd: z.string(),

  exterUserId: z.string().min(1),
  password: z.string().min(1),
  passwordConfirm: z.string().min(1),

  tel: z.string().min(1),
  zipCd: z.string().min(1),
  addr: z.string().min(1),
  addrDtil: z.string().min(1),
  emailAddr: z.string().optional().default(""),

  cntryCd: z.string().min(1),
  userNm: z.string().min(1).regex(/^\S+$/, "공백 없이 입력해주세요."),
  idNo1: z.string().min(1),
  idNo2: z.string().min(1),
  isuDd: z.string(),
  idSn: z.string(),
  visaCd: z.string(),
});

export type TScannedResult = {
  id1: string;
  id2: string;
  idTp: TIdTp;
  image: Blob;
  userNm: string;
};
