import z from "zod";

export const userlistDto = z.object({
  userId: z
    .string()
    .nullish()
    .transform((v) => v ?? ""),
  enabled: z
    .string()
    .nullish()
    .transform((v) => (v === "true" ? true : false)),
});

export const adminlistDto = z.object({
  adminId: z
    .string()
    .nullish()
    .transform((v) => v ?? ""),
  adminName: z
    .string()
    .nullish()
    .transform((v) => v ?? ""),
  enabled: z
    .string()
    .nullish()
    .transform((v) => (v === "true" ? true : false)),
});

export type TUserlistDto = z.infer<typeof userlistDto>;
export type TAdminlistDto = z.infer<typeof adminlistDto>;
