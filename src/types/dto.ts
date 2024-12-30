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

export type TUserlistDto = z.infer<typeof userlistDto>;
