import { z } from "zod";

export const idCardDto = z.object({
  brkrId: z.string().optional(),
});

export type TIdCardDto = z.infer<typeof idCardDto>;

export type TOCR = "idcard" | "driver" | "passport" | "passport-overseas" | "alien" | "alien-back";

export type TScannedResult = {
  name: string;
  id1: string;
  id2: string;
  image: Blob;
  type: "1" | "2" | "3";
};

export const bankDto = z.object({
  userId: z.string(),
  bankCd: z.string().optional(),
  bankNm: z.string().optional(),
  bankAccountNo: z.string().optional(),
});

export type TBankDto = z.infer<typeof bankDto>;

export const faceDto = z.object({
  userId: z.string().optional(),
});

export type TFaceDto = z.infer<typeof faceDto>;
