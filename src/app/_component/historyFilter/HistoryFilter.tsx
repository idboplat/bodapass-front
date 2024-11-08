import DateBtn from "../btn/DateBtn";
import { DateType } from "../datepicker/DatePicker";
import RangePicker from "../datepicker/RangePicker";
import css from "./HistoryFIlter.module.scss";
import { addDays, addMonths, addWeeks } from "date-fns";

interface HistoryFilterProps {
  date: [DateType, DateType];
  onDateChange: (date: [DateType, DateType]) => void;
  onDateBtnClick: (startDate: DateType) => void;
}

const today = new Date();

export default function HistoryFilter({ date, onDateChange, onDateBtnClick }: HistoryFilterProps) {
  return (
    <div className={css.wrap}>
      <div className={css.btnBox}>
        <DateBtn onClick={() => onDateBtnClick(addDays(today, -1))}>1Day</DateBtn>
        <DateBtn onClick={() => onDateBtnClick(addWeeks(today, -1))}>1Week</DateBtn>
        <DateBtn onClick={() => onDateBtnClick(addMonths(today, -1))}>1Month</DateBtn>
        <DateBtn onClick={() => onDateBtnClick(addMonths(today, -3))}>3Month</DateBtn>
      </div>
      <div>
        <RangePicker date={date} onChange={onDateChange} />
      </div>
    </div>
  );
}
