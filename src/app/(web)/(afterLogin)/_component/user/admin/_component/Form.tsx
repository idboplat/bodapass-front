import { navBtn } from "@/app/_component/btn/btn.css";
import { DateType } from "@/app/_component/datepicker/DatePicker";
import LabelInput from "@/app/_component/input/LabelInput";
import { useSetModalStore } from "@/app/_lib/modalStore";
import { useState } from "react";
import { useSetAdminStore } from "../_lib/store";
import CreEmplModal from "./CreEmplModal";
import { useIsFetching } from "@tanstack/react-query";
import { addDays } from "date-fns";
import { Session } from "next-auth";
import { btnWrap, inputWrap, leftWrap, navWrap } from "./nav.css";

const ID = "adminNavForm";

enum AdminNavForm {
  extnUserId = ID + "Id",
  emplName = ID + "Name",
  date = ID + "Date",
}

interface FormProps {
  session: Session;
}

export default function Form({ session }: FormProps) {
  const [extnUserId, setExtnUserId] = useState("");
  const [emplName, setEmplName] = useState("");
  const [date, setDate] = useState<[DateType, DateType]>([addDays(new Date(), -1), new Date()]);

  const isFetching = useIsFetching({ queryKey: ["TBW_000001_Q01"] });

  const actions = useSetAdminStore();
  const modalAction = useSetModalStore();

  const openModal = () => {
    modalAction.push(CreEmplModal, { props: { session } });
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    switch (id) {
      case AdminNavForm.extnUserId:
        setExtnUserId(() => value);
        break;
      case AdminNavForm.emplName:
        setEmplName(() => value);
        break;
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    actions.setState({ extnUserId, emplName, date });
  };

  return (
    <form className={navWrap} onSubmit={onSubmit}>
      <div className={leftWrap}>
        <div className={inputWrap}>
          <div>
            <LabelInput
              label="관리자 ID"
              value={extnUserId}
              id={AdminNavForm.extnUserId}
              onChange={onChangeInput}
              style={{ width: 160 }}
              onReset={() => setExtnUserId(() => "")}
            />
          </div>
          <div>
            <LabelInput
              label="관리자 명"
              value={emplName}
              id={AdminNavForm.emplName}
              onChange={onChangeInput}
              style={{ width: 160 }}
              onReset={() => setEmplName(() => "")}
            />
          </div>
          <button type="submit" className={navBtn} disabled={isFetching > 0}>
            조회
          </button>
        </div>
        {/* <div className={datePickerWrap}>
          <div>등록일</div>
          <RangePicker date={date} onChange={onDateChange} />
        </div> */}
      </div>
      <div className={btnWrap}>
        <button type="button" className={navBtn} onClick={openModal}>
          관리자 생성
        </button>
      </div>
    </form>
  );
}
