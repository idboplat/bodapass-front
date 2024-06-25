"use client";

import DateBtn from "@/app/_component/btn/DateBtn";
import { navWrap, historyFilterwrap, btnWrap, inputWrap } from "./nav.css";
import { useCoinStore, useSetCoinStore } from "../_lib/store";
import RangePicker from "@web/(afterLogin)/_component/datepicker/RangePicker";
import { addDays, addMonths, addWeeks, set } from "date-fns";
import { DateType } from "@web/(afterLogin)/_component/datepicker/DatePicker";
import { navBtn } from "@/app/_component/btn/btn.css";
import { useSetModalStore } from "@/app/_lib/modalStore";
import CreCoinModal from "./CreCoinlModal";
import LabelInput from "@/app/_component/input/LabelInput";
import TextSelect from "@/app/_component/select/TextSelect";
import { useState } from "react";

export default function Nav() {
  const date = useCoinStore((state) => state.date);
  const [mvioTp, setMvioTp] = useState("");
  const actions = useSetCoinStore();

  const modalAction = useSetModalStore();

  const openModal = () => {
    modalAction.push(CreCoinModal);
  };

  const onChange = (date: [DateType, DateType]) => {
    actions.setState({ date });
  };

  const onDateBtnClick = (startDate: DateType, endDate: DateType) => {
    actions.setState({ date: [startDate, endDate] });
  };

  const onChangeSelect = (value: string) => {
    setMvioTp(() => value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (mvioTp === "입고") {
      actions.setState({ mvioTp: "I" });
    } else if (mvioTp === "출고") {
      actions.setState({ mvioTp: "O" });
    } else {
      actions.setState({ mvioTp: "" });
    }
  };

  const today = new Date();
  return (
    <form className={navWrap} onSubmit={onSubmit}>
      <div className={inputWrap}>
        <div>
          <TextSelect
            value={mvioTp}
            onChange={onChangeSelect}
            items={["*", "입고", "출고"]}
            placeholder="입출고 구분"
            style={{
              height: 35.6,
              width: 120,
            }}
          />
        </div>
      </div>
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
      <div className={btnWrap}>
        <button className={navBtn} onClick={openModal} type="button">
          추가발행
        </button>
        <button className={navBtn} type="submit">
          조회
        </button>
      </div>
    </form>
  );
}
