import ReactDatePicker from "react-datepicker";
import { rangePickerWrap } from "./rangePicker.css";
import CalendarIcon from "@/asset/svg/calendarIcon.svg?react";
import { ko } from "date-fns/locale";
import { DateType } from "./DatePicker";

interface RangePickerProps {
  date: [DateType, DateType];
  onChange: ([newStartDate, newEndDate]: [DateType, DateType]) => void;
}

export default function RangePicker({ date, onChange }: RangePickerProps) {
  return (
    <div className={rangePickerWrap}>
      <ReactDatePicker
        selected={date[0]}
        startDate={date[0]}
        endDate={date[1]}
        onChange={onChange}
        placeholderText="날짜를 선택해주세요."
        selectsRange
        dateFormat={"yyyy-MM-dd"}
        isClearable
        showIcon
        icon={<CalendarIcon />}
        locale={ko}
      />
    </div>
  );
}
