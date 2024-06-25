"use client";

import { navBtn } from "@/app/_component/btn/btn.css";
import LabelInput from "@/app/_component/input/LabelInput";
import { useSetModalStore } from "@/app/_lib/modalStore";
import { DateType } from "@web/(afterLogin)/_component/datepicker/DatePicker";
import RangePicker from "@web/(afterLogin)/_component/datepicker/RangePicker";
import { useEmplStore, useSetEmplStore } from "../_lib/store";
import CreEmplModal from "./CreEmplModal";
import { btnWrap, datePickerWrap, inputWrap, leftWrap, navWrap } from "./nav.css";

export default function Nav() {
  const date = useEmplStore((state) => state.date);
  const corpCode = useEmplStore((state) => state.corpCode);
  const emplID = useEmplStore((state) => state.emplID);
  const emplName = useEmplStore((state) => state.emplName);
  const actions = useSetEmplStore();

  const modalAction = useSetModalStore();

  const openModal = () => {
    modalAction.push(CreEmplModal);
  };

  const onDateChange = (date: [DateType, DateType]) => {
    actions.setState({ date });
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    switch (id) {
      case "corpCode":
        actions.setState({ corpCode: value });
        break;
      case "emplID":
        actions.setState({ emplID: value });
        break;
      case "emplName":
        actions.setState({ emplName: value });
        break;
    }
  };

  return (
    <div className={navWrap}>
      <div className={leftWrap}>
        <div className={inputWrap}>
          <div>
            <LabelInput
              label="회사코드"
              value={corpCode}
              id="corpCode"
              onChange={onChangeInput}
              style={{ width: 160 }}
              onReset={() => actions.setState({ corpCode: "" })}
            />
          </div>
          <div>
            <LabelInput
              label="사원ID"
              value={emplID}
              id="emplID"
              onChange={onChangeInput}
              style={{ width: 160 }}
              onReset={() => actions.setState({ emplID: "" })}
            />
          </div>
          <div>
            <LabelInput
              label="사원명"
              value={emplName}
              id="emplName"
              onChange={onChangeInput}
              style={{ width: 160 }}
              onReset={() => actions.setState({ emplName: "" })}
            />
          </div>
        </div>
        <div className={datePickerWrap}>
          <div>등록일</div>
          <RangePicker date={date} onChange={onDateChange} />
        </div>
      </div>
      <div className={btnWrap}>
        <button className={navBtn} onClick={openModal}>
          사원 등록
        </button>
        <button className={navBtn}>조회</button>
      </div>
    </div>
  );
}
