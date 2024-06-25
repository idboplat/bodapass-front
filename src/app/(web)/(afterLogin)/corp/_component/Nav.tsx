"use client";

import DateBtn from "@/app/_component/btn/DateBtn";
import { navWrap, historyFilterwrap, btnWrap, datePickerWrap, inputWrap } from "./nav.css";
import { useCorpStore, useSetCorpStore } from "../_lib/store";
import RangePicker from "@web/(afterLogin)/_component/datepicker/RangePicker";
import { addDays, addMonths, addWeeks } from "date-fns";
import { DateType } from "@web/(afterLogin)/_component/datepicker/DatePicker";
import { navBtn } from "@/app/_component/btn/btn.css";
import { useSetModalStore } from "@/app/_lib/modalStore";
import CreCorpModal from "./CreCorpModal";
import { useState } from "react";
import LabelInput from "@/app/_component/input/LabelInput";
import TextSelect from "@/app/_component/select/TextSelect";
import { CORP_GRP_TP } from "@/type/common";

export default function Nav() {
  const date = useCorpStore((state) => state.date);
  const corpNm = useCorpStore((state) => state.corpNm);
  const corpGrpTp = useCorpStore((state) => state.corpGrpTp);
  const actions = useSetCorpStore();

  const modalAction = useSetModalStore();

  const openModal = () => {
    modalAction.push(CreCorpModal);
  };

  const onChange = (date: [DateType, DateType]) => {
    actions.setState({ date });
  };

  const onChangeSelect = (value: string) => actions.setState({ corpGrpTp: value as CORP_GRP_TP });

  const getCorpGrpTpItems = (corpGrpTp: CORP_GRP_TP) => {
    switch (corpGrpTp) {
      case "G1":
        return ["G2", "G4"];
      case "G2":
        return ["G3", "G4"];
      case "G3":
        return ["G4"];
      default:
        return [];
    }
  };
  const onDateBtnClick = (startDate: DateType, endDate: DateType) => {
    actions.setState({ date: [startDate, endDate] });
  };

  const today = new Date();
  return (
    <div className={navWrap}>
      <div className={inputWrap}>
        <div>
          <LabelInput
            label="회사명"
            value={corpNm}
            id="corpNm"
            onChange={(e) => actions.setState({ corpNm: e.target.value })}
            onReset={() => actions.setState({ corpNm: "" })}
          />
        </div>
        <div>
          <TextSelect
            value={corpGrpTp}
            onChange={onChangeSelect}
            items={getCorpGrpTpItems("G1")}
            placeholder="회사그룹 구분"
            style={{
              height: 35.6,
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
        <button className={navBtn} onClick={openModal}>
          회사 생성
        </button>
        <button className={navBtn}>조회</button>
      </div>
    </div>
  );
}
