"use client";

import DateBtn from "@/app/_component/btn/DateBtn";
import { navWrap, historyFilterwrap, btnWrap } from "./nav.css";
import { useTransactionStore, useSetTransactionStore } from "../_lib/store";
import RangePicker from "@web/(afterLogin)/_component/datepicker/RangePicker";
import { addDays, addMonths, addWeeks } from "date-fns";
import { DateType } from "@web/(afterLogin)/_component/datepicker/DatePicker";
import { navBtn } from "@/app/_component/btn/btn.css";

export default function Nav() {
  const date = useTransactionStore((state) => state.date);
  const actions = useSetTransactionStore();

  const onChange = (date: [DateType, DateType]) => {
    actions.setDate(date);
  };

  const onDateBtnClick = (startDate: DateType, endDate: DateType) => {
    actions.setDate([startDate, endDate]);
  };

  const today = new Date();
  return (
    <div className={navWrap}>
      <div className={historyFilterwrap}>
        <div className={btnWrap}>
          <DateBtn onClick={() => onDateBtnClick(addDays(today, -1), today)}>1D</DateBtn>
          <DateBtn onClick={() => onDateBtnClick(addWeeks(today, -1), today)}>1W</DateBtn>
          <DateBtn onClick={() => onDateBtnClick(addMonths(today, -1), today)}>1M</DateBtn>
          <DateBtn onClick={() => onDateBtnClick(addMonths(today, -3), today)}>3M</DateBtn>
        </div>
        <div>
          <RangePicker date={date} onChange={onChange} />
        </div>
      </div>
      <div>
        <button className={navBtn}>조회</button>
      </div>
    </div>
  );
}
