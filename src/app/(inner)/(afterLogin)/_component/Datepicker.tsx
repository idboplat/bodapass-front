import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale/ko";

registerLocale("ko", ko);

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
