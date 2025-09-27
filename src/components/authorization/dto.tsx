import { z } from "zod";

export const idCardDto = z.object({
  brkrId: z.number().optional(),
});

export type TIdCardDto = z.infer<typeof idCardDto>;

export type TOCR = "idcard" | "driver" | "passport" | "passport-overseas" | "alien" | "alien-back";

export type TScannedResult = {
  id1: string;
  id2: string;
  name: string;
  addr: string;
  image: Blob;
};
