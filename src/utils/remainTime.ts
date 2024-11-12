import dayjs from "@/libraries/dayjs";

export const remainTime = (exp: string) => {
  const expireTime = dayjs(exp);
  if (!expireTime.isValid()) return 1;
  const now = dayjs();
  const diff = expireTime.diff(now, "second");
  return diff;
};
