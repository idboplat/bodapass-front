import CalendarIcon from "@/asset/svg/calendarIcon.svg?react";
import { ko } from "date-fns/locale";
import ReactDatePicker from "react-datepicker";
import { datePickerWrap } from "./datepicker.css";

export type DateType = Date | null;

interface DatePickerProps {
  startDate: DateType;
  onChange: (newStartDate: DateType) => void;
  placeholder?: string;
  style?: React.CSSProperties;
}

export default function DatePicker({ style, startDate, onChange, placeholder }: DatePickerProps) {
  return (
    <div className={datePickerWrap} style={style}>
      <ReactDatePicker
        selected={startDate}
        onChange={onChange}
        showIcon
        icon={<CalendarIcon />}
        dateFormat={"yyyy년 MM월 dd일"}
        isClearable
        locale={ko}
        autoComplete="off" // input에 자동완성 기능을 끄는 속성
        placeholderText={placeholder}
      />
    </div>
  );
}
