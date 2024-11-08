import ReactDatePicker from "react-datepicker";
import css from "./DatePicker.module.scss";
import CalendarIcon from "@/asset/svg/calendarIcon.svg?react";
import { ko } from "date-fns/locale";
import { DateType } from "./DatePicker";

interface RangePickerProps {
  date: [DateType, DateType];
  onChange: ([newStartDate, newEndDate]: [DateType, DateType]) => void;
}
// ex) 6개월 이상 조회할 수 없습니다.
// minDate={new Date("2024-01-01")}
// maxDate={!!date[0] ? addMonths(date[0] as Date, 6) : new Date("2024-12-31")}
export default function RangePicker({ date, onChange }: RangePickerProps) {
  return (
    <div className={css.rangePickerWrap}>
      <ReactDatePicker
        selected={date[0]}
        startDate={date[0]}
        endDate={date[1]}
        onChange={onChange}
        placeholderText="시작일자 ~ 종료일자"
        selectsRange
        dateFormat={"yyyy-MM-dd"}
        isClearable
        showIcon
        icon={<CalendarIcon />}
        locale={ko}
        autoComplete="off" // input에 자동완성 기능을 끄는 속성
      />
    </div>
  );
}
