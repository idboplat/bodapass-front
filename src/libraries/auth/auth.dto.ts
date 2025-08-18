import { z } from "zod";

export type TSignInDto = z.infer<typeof signInDto>;
export const signInDto = z.object({
  externalId: z.string().min(1),
  password: z.string().min(1),
});
