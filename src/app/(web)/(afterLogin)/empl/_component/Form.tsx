import { navBtn } from "@/app/_component/btn/btn.css";
import LabelInput from "@/app/_component/input/LabelInput";
import { useSetModalStore } from "@/app/_lib/modalStore";
import { DateType } from "@web/(afterLogin)/_component/datepicker/DatePicker";
import RangePicker from "@web/(afterLogin)/_component/datepicker/RangePicker";
import { useState } from "react";
import { useSetEmplStore } from "../_lib/store";
import CreEmplModal from "./CreEmplModal";
import { btnWrap, datePickerWrap, inputWrap, leftWrap, navWrap } from "./nav.css";
import { Session } from "next-auth";

const ID = "emplNavForm";

enum EmplNavForm {
  id = ID + "Id",
  name = ID + "Name",
  date = ID + "Date",
}

interface FormProps {
  session: Session;
}

export default function Form({ session }: FormProps) {
  const [emplId, setEmplId] = useState("");
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
      case EmplNavForm.id:
        setEmplId(() => value);
        break;
      case EmplNavForm.name:
        setEmplName(() => value);
        break;
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    actions.setState(emplId, emplName, date);
  };

  return (
    <form className={navWrap} onSubmit={onSubmit}>
      <div className={leftWrap}>
        <div className={inputWrap}>
          <div>
            <LabelInput
              label="사원ID"
              value={emplId}
              id={EmplNavForm.id}
              onChange={onChangeInput}
              style={{ width: 160 }}
              onReset={() => setEmplId(() => "")}
            />
          </div>
          <div>
            <LabelInput
              label="사원명"
              value={emplName}
              id={EmplNavForm.name}
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
