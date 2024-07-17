import DateBtn from "@/app/_component/btn/DateBtn";
import { navWrap, historyFilterwrap, btnWrap } from "./nav.css";
import { useSetCoinStore } from "../_lib/store";
import RangePicker from "@/app/_component/datepicker/RangePicker";
import { addDays, addMonths, addWeeks } from "date-fns";
import { DateType } from "@/app/_component/datepicker/DatePicker";
import { navBtn } from "@/app/_component/btn/btn.css";
import { useSetModalStore } from "@/app/_lib/modalStore";
import CreCoinModal from "./CreCoinlModal";
import LabelInput from "@/app/_component/input/LabelInput";
import TextSelect from "@/app/_component/select/TextSelect";
import { useState } from "react";
import { Session } from "next-auth";

interface FormProps {
  session: Session;
}
const today = new Date();

export default function Form({ session }: FormProps) {
  const [date, setDate] = useState<[DateType, DateType]>([null, null]);
  // const [mvioTp, setMvioTp] = useState("");
  const actions = useSetCoinStore();

  const modalAction = useSetModalStore();

  const openModal = () => {
    modalAction.push(CreCoinModal, { props: { session } });
  };

  const onDateChange = (date: [DateType, DateType]) => {
    setDate(() => date);
  };

  const onDateBtnClick = (startDate: DateType) => {
    setDate(() => [startDate, today]);
    actions.setState({ date });
  };

  // const onChangeSelect = (value: string) => {
  //   setMvioTp(() => value);
  // };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    actions.setState({
      date,
    });
  };

  return (
    <form className={navWrap} onSubmit={onSubmit}>
      {/* <div className={inputWrap}>
        <div>
          <TextSelect
            value={mvioTp}
            onChange={onChangeSelect}
            items={["*", "입고", "출고"]}
            placeholder="입출고 구분"
            style={{
              height: 36,
              width: 120,
            }}
          />
        </div>
      </div> */}
      <div className={historyFilterwrap}>
        <div className={btnWrap}>
          <DateBtn onClick={() => onDateBtnClick(addDays(today, -1))}>1Day</DateBtn>
          <DateBtn onClick={() => onDateBtnClick(addWeeks(today, -1))}>1Week</DateBtn>
          <DateBtn onClick={() => onDateBtnClick(addMonths(today, -1))}>1Month</DateBtn>
          <DateBtn onClick={() => onDateBtnClick(addMonths(today, -3))}>3Month</DateBtn>
        </div>
        <div>
          <RangePicker date={date} onChange={onDateChange} />
        </div>
        <button className={navBtn} type="submit">
          내역 조회
        </button>
      </div>
      <div className={btnWrap}>
        <button className={navBtn} onClick={openModal} type="button">
          USDL 발행
        </button>
      </div>
    </form>
  );
}
