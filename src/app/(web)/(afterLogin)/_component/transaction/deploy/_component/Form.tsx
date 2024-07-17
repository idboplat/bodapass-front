import { navWrap, btnWrap, inputWrap } from "./nav.css";
import { useSetCoinStore } from "../_lib/store";
import { DateType } from "@/app/_component/datepicker/DatePicker";
import { navBtn } from "@/app/_component/btn/btn.css";
import { useSetModalStore } from "@/app/_lib/modalStore";
import CreCoinModal from "./CreCoinlModal";
import LabelInput from "@/app/_component/input/LabelInput";
import TextSelect from "@/app/_component/select/TextSelect";
import { useState } from "react";
import { Session } from "next-auth";
import HistoryFilter from "@/app/_component/historyFilter/HistoryFilter";

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
    actions.setState({ date: [startDate, today] });
    setDate(() => [startDate, today]);
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
      <div className={inputWrap}>
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
        <HistoryFilter date={date} onDateChange={onDateChange} onDateBtnClick={onDateBtnClick} />
        <button className={navBtn} type="submit">
          조회
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
