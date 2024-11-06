import { navWrap, btnWrap, inputWrap } from "./nav.css";
import { useSetCoinStore } from "../_lib/store";
import { DateType } from "@/app/_component/datepicker/DatePicker";
import module from "@/app/_component/btn/Btn.module.scss";
import { useSetModalStore } from "@/app/_lib/modalStore";
import CreCoinModal from "./CreCoinlModal";
import { useState } from "react";
import { Session } from "next-auth";
import HistoryFilter from "@/app/_component/historyFilter/HistoryFilter";
import { useIsFetching, useQueryClient } from "@tanstack/react-query";
import { addDays } from "date-fns";
import BalanceViewer from "@transaction/_component/BalanceViewer";

interface FormProps {
  session: Session;
}
const today = new Date();

export default function Form({ session }: FormProps) {
  const queryClient = useQueryClient();
  const [date, setDate] = useState<[DateType, DateType]>([addDays(today, -1), today]);

  const isFetching = useIsFetching({ queryKey: ["TBW_000300_Q01"] });

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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    actions.setState({
      date,
    });
    queryClient.invalidateQueries({ queryKey: ["TBW_002000_S02"] });
  };

  return (
    <form className={navWrap} onSubmit={onSubmit}>
      <BalanceViewer session={session} />
      <div className={inputWrap}>
        <HistoryFilter date={date} onDateChange={onDateChange} onDateBtnClick={onDateBtnClick} />
        <button className={module.navBtn} type="submit" disabled={isFetching > 0}>
          내역 조회
        </button>
      </div>
      <div className={btnWrap}>
        <button className={module.navBtn} onClick={openModal} type="button">
          USDL 발행
        </button>
      </div>
    </form>
  );
}
