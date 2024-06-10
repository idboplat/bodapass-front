"use client";

import RangePicker from "@web/(afterLogin)/_component/RangePicker";
import { navWrap, leftWrap, inputWrap, datePickerWrap } from "./nav.css";
import LabelInput from "@/app/_component/input/LabelInput";
import { useEmplStore, useSetEmplStore } from "../_lib/store";
import { DateType } from "@web/(afterLogin)/_component/DatePicker";

export default function Nav() {
  const date = useEmplStore((state) => state.date);
  const corpCode = useEmplStore((state) => state.corpCode);
  const emplID = useEmplStore((state) => state.emplID);
  const emplName = useEmplStore((state) => state.emplName);

  const actions = useSetEmplStore();

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
    </div>
  );
}
