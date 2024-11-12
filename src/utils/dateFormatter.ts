import { DateValue } from "@mantine/dates";
import dayjs from "@/libraries/dayjs";

export const dateToString = (date: DateValue) => {
  if (!date) return "";
  return dayjs(date).format("YYYYMMDD");
};
