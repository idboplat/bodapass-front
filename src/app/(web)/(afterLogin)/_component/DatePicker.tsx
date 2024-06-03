import CalendarIcon from "@/asset/svg/calendarIcon.svg?react";
import { ko } from "date-fns/locale";
import ReactDatePicker from "react-datepicker";
import { datePickerWrap } from "./datepicker.css";

export type DateType = Date | null;

interface DatePickerProps {
  startDate: DateType;
  onChange: (newStartDate: DateType) => void;
}

export default function DatePicker({ startDate, onChange }: DatePickerProps) {
  return (
    <div className={datePickerWrap}>
      <ReactDatePicker
        selected={startDate}
        onChange={onChange}
        showIcon
        icon={<CalendarIcon />}
        dateFormat={"yyyy-MM-dd"}
        isClearable
        locale={ko}
      />
    </div>
  );
}
