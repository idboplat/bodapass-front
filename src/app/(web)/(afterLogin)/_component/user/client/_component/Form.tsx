import { Session } from "next-auth";
import { btnWrap, datePickerWrap, inputWrap, leftWrap, navWrap } from "./nav.css";
import LabelInput from "@/app/_component/input/LabelInput";
import { navBtn } from "@/app/_component/btn/btn.css";
import { useState } from "react";
import { DateType } from "@/app/_component/datepicker/DatePicker";
import { useSetClientStore } from "../_lib/store";

const ID = "clientNavForm";

enum ClientNavForm {
  extnUserId = ID + "Id",
  date = ID + "Date",
}

interface FormProps {
  session: Session;
}

export default function Form({ session }: FormProps) {
  const [extnUserId, setExtnUserId] = useState("");
  const [date, setDate] = useState<[DateType, DateType]>([null, null]);
  const actions = useSetClientStore();

  const onDateChange = (date: [DateType, DateType]) => {
    setDate(() => date);
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    switch (id) {
      case ClientNavForm.extnUserId:
        setExtnUserId(() => value);
        break;
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    actions.setState(extnUserId, date);
  };

  return (
    <form className={navWrap} onSubmit={onSubmit}>
      <div className={leftWrap}>
        <div className={inputWrap}>
          <div>
            <LabelInput
              label="사용자 ID"
              value={extnUserId}
              id={ClientNavForm.extnUserId}
              onChange={onChangeInput}
              style={{ width: 160 }}
              onReset={() => setExtnUserId(() => "")}
            />
          </div>
        </div>
        {/* <div className={datePickerWrap}>
      <div>등록일</div>
      <RangePicker date={date} onChange={onDateChange} />
    </div> */}
      </div>
      <div className={btnWrap}>
        <button type="submit" className={navBtn}>
          조회
        </button>
      </div>
    </form>
  );
}
