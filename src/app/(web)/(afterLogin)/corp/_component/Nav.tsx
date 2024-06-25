"use client";

import DateBtn from "@/app/_component/btn/DateBtn";
import { navWrap, historyFilterwrap, btnWrap, datePickerWrap, inputWrap } from "./nav.css";
import { useCorpStore, useSetCorpStore } from "../_lib/store";
import RangePicker from "@web/(afterLogin)/_component/datepicker/RangePicker";
import { addDays, addMonths, addWeeks, set } from "date-fns";
import { DateType } from "@web/(afterLogin)/_component/datepicker/DatePicker";
import { navBtn } from "@/app/_component/btn/btn.css";
import { useSetModalStore } from "@/app/_lib/modalStore";
import CreCorpModal from "./CreCorpModal";
import { useState } from "react";
import LabelInput from "@/app/_component/input/LabelInput";
import TextSelect from "@/app/_component/select/TextSelect";
import { CORP_GRP_ENTRY, CORP_GRP_KEY, CORP_GRP_VALUE } from "@/app/_const/tp";

export default function Nav() {
  const [date, setDate] = useState<[DateType, DateType]>([new Date(), new Date()]);
  const [corpNm, setCorpNm] = useState("");
  const [corpGrpValue, setCorpGrpValue] = useState("");

  const actions = useSetCorpStore();
  const modalAction = useSetModalStore();

  const openModal = () => {
    modalAction.push(CreCorpModal);
  };

  const onChange = (date: [DateType, DateType]) => {
    setDate(() => date);
  };

  const onChangeSelect = (value: string) => {
    setCorpGrpValue(() => value);
  };

  const onDateBtnClick = (startDate: DateType, endDate: DateType) => {
    actions.setState({ date: [startDate, endDate] });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const idx = CORP_GRP_ENTRY.findIndex((item) => item[1] === corpGrpValue);
    if (idx === -1) return;
    actions.setState({ corpGrpTp: CORP_GRP_KEY[idx] });
    actions.setState({ corpNm });
  };

  const today = new Date();

  return (
    <form className={navWrap} onSubmit={onSubmit}>
      <div className={inputWrap}>
        <div>
          <LabelInput
            label="회사명"
            value={corpNm}
            id="corpNm"
            onChange={(e) => setCorpNm(() => e.target.value)}
            onReset={() => setCorpNm(() => "")}
          />
        </div>
        <div>
          <TextSelect
            value={corpGrpValue}
            onChange={onChangeSelect}
            items={CORP_GRP_VALUE}
            placeholder="회사유형"
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
        <div className={datePickerWrap}>
          <div>등록일</div>
          <RangePicker date={date} onChange={onChange} />
        </div>
      </div>
      <div className={btnWrap}>
        <button type="button" className={navBtn} onClick={openModal}>
          회사 생성
        </button>
        <button type="submit" className={navBtn}>
          조회
        </button>
      </div>
    </form>
  );
}
