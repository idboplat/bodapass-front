import { z } from "zod";

export type TSignInDto = z.infer<typeof signInDto>;
export const signInDto = z.object({
  corpCd: z.string(),
  externId: z.string(),
  password: z.string(),
});
