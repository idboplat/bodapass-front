import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import dayjs from "dayjs";
import "react-datepicker/dist/react-datepicker.css";
import "dayjs/locale/ko";
import localeData from "dayjs/plugin/localeData";

dayjs.locale("ko");
dayjs.extend(localeData);

const getDayjsLocale = (): any => {
  const localeData = dayjs().localeData();
  return {
    code: "ko",
    formatDistance: () => "",
    formatRelative: () => "",
    localize: {
      day: (n: number) => localeData.weekdaysShort()[n],
      month: (n: number) => localeData.months()[n],
      dayPeriod: () => "",
      era: () => "",
      ordinalNumber: () => 0,
      quarter: () => 0,
    },
    formatLong: {
      date: () => "yyyy-MM-dd",
      time: () => "HH:mm",
      dateTime: () => "yyyy-MM-dd HH:mm",
    },
    match: {
      ordinalNumber: () => null,
      era: () => null,
      quarter: () => null,
      month: () => null,
      day: () => null,
      dayPeriod: () => null,
    },
    options: {
      weekStartsOn: 0,
      firstWeekContainsDate: 1,
    },
  };
};

registerLocale("ko", getDayjsLocale());

export default function Datepicker() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  return (
    <DatePicker
      locale="ko"
      selected={startDate}
      dateFormat="yyyy.MM.dd"
      onChange={() => console.log("")}
    />
  );
}
