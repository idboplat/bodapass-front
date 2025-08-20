import { z } from "zod";

export type TSignInDto = z.infer<typeof signInDto>;
export const signInDto = z.object({
  externalId: z.string().min(1),
  password: z.string().min(1),
});

export type TSignUpDto = z.infer<typeof signUpDto>;
export const signUpDto = z.object({
  externalId: z.string().min(1),
  userName: z.string().min(1),
  loginTp: z.enum(["1", "2", "3"]),
  workerTp: z.enum(["1", "2", "3"]),
  password: z.string().min(1),
  passwordConfirm: z.string().min(1),
  address: z.string().min(1),
  addressDetail: z.string().min(1),
  tel1: z.string().min(1),
  tel2: z.string().min(1),
  tel3: z.string().min(1),
  contryCode: z.string().min(1),
  zipCode: z.string().min(1),
  brokerId: z.string(),
});
