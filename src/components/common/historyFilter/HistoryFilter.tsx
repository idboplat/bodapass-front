import CalendarIcon from "@/assets/svg/calendarIcon.svg?react";
import { DatePickerInput, DateValue } from "@mantine/dates";
import DateBtn from "../btn/DateBtn";
import css from "./HistoryFIlter.module.scss";
import dayjs from "@/libraries/dayjs";

interface HistoryFilterProps {
  date: [DateValue, DateValue];
  onDateChange: (date: [DateValue, DateValue]) => void;
  onDateBtnClick: (startDate: DateValue) => void;
}

export default function HistoryFilter({ date, onDateChange, onDateBtnClick }: HistoryFilterProps) {
  const today = dayjs();

  return (
    <div className={css.wrap}>
      <div className={css.btnBox}>
        <DateBtn onClick={() => onDateBtnClick(today.subtract(1, "day").toDate())}>1Day</DateBtn>
        <DateBtn onClick={() => onDateBtnClick(today.subtract(1, "week").toDate())}>1Week</DateBtn>
        <DateBtn onClick={() => onDateBtnClick(today.subtract(1, "month").toDate())}>
          1Month
        </DateBtn>
        <DateBtn onClick={() => onDateBtnClick(today.subtract(3, "month").toDate())}>
          3Month
        </DateBtn>
      </div>
      <div>
        <DatePickerInput
          type="range"
          leftSection={<CalendarIcon color="#000000" />}
          value={date}
          valueFormat="YYYY년 MM월 DD일"
          onChange={onDateChange}
          styles={{ input: { height: 36, width: 270 } }}
          placeholder="시작일자 ~ 종료일자"
          numberOfColumns={2}
          clearable
        />
      </div>
    </div>
  );
}
