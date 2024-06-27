import { navBtn } from "@/app/_component/btn/btn.css";
import LabelInput from "@/app/_component/input/LabelInput";
import { useSetModalStore } from "@/app/_lib/modalStore";
import { DateType } from "@/app/_component/datepicker/DatePicker";
import RangePicker from "@/app/_component/datepicker/RangePicker";
import { useState } from "react";
import { useSetEmplStore } from "../_lib/store";
import CreEmplModal from "./CreEmplModal";
import { btnWrap, datePickerWrap, inputWrap, leftWrap, navWrap } from "./nav.css";
import { Session } from "next-auth";

const ID = "emplNavForm";

enum EmplNavForm {
  extnUserId = ID + "Id",
  emplName = ID + "Name",
  date = ID + "Date",
}

interface FormProps {
  session: Session;
}

export default function Form({ session }: FormProps) {
  const [emplId, _setEmplId] = useState("");
  const [extnUserId, setExtnUserId] = useState("");
  const [emplName, setEmplName] = useState("");
  const [date, setDate] = useState<[DateType, DateType]>([null, null]);
  const actions = useSetEmplStore();

  const modalAction = useSetModalStore();

  const openModal = () => {
    modalAction.push(CreEmplModal, { props: { session } });
  };

  const onDateChange = (date: [DateType, DateType]) => {
    setDate(() => date);
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    switch (id) {
      case EmplNavForm.extnUserId:
        setExtnUserId(() => value);
        break;
      case EmplNavForm.emplName:
        setEmplName(() => value);
        break;
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    actions.setState(emplId, extnUserId, emplName, date);
  };

  return (
    <form className={navWrap} onSubmit={onSubmit}>
      <div className={leftWrap}>
        <div className={inputWrap}>
          <div>
            <LabelInput
              label="관리자 ID"
              value={extnUserId}
              id={EmplNavForm.extnUserId}
              onChange={onChangeInput}
              style={{ width: 160 }}
              onReset={() => setExtnUserId(() => "")}
            />
          </div>
          <div>
            <LabelInput
              label="관리자 명"
              value={emplName}
              id={EmplNavForm.emplName}
              onChange={onChangeInput}
              style={{ width: 160 }}
              onReset={() => setEmplName(() => "")}
            />
          </div>
        </div>
        {/* <div className={datePickerWrap}>
          <div>등록일</div>
          <RangePicker date={date} onChange={onDateChange} />
        </div> */}
      </div>
      <div className={btnWrap}>
        <button type="button" className={navBtn} onClick={openModal}>
          사원 등록
        </button>
        <button type="submit" className={navBtn}>
          조회
        </button>
      </div>
    </form>
  );
}
