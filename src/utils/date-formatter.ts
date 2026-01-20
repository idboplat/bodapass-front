import { DateValue } from "@mantine/dates";
import dayjs from "@/libraries/dayjs";

export const dateToString = (date: DateValue) => {
  if (!date) return "";
  return dayjs(date).format("YYYYMMDD");
};
/** 초를 MM:SS 형식으로 변환  */
export const formatTimeMMSS = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};
