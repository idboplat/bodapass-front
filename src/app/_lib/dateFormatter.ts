import { format } from "date-fns";

export const dateToString = (date: Date | null) => {
  if (!date) return "";
  return format(date, "yyyyMMdd");
};
