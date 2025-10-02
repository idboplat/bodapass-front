import { z } from "zod";

export const contractDto = z.object({
  mastCorpCd: z.string().optional(),
  corpCd: z.string().optional(),
  userId: z.string().optional(),
});

export type TContractDto = z.infer<typeof contractDto>;
