import btnCss from "@/components/common/btn/Btn.module.scss";
import HistoryFilter from "@/components/common/historyFilter/HistoryFilter";
import BalanceViewer from "@/components/BalanceViewer";
import { useSetModalStore } from "@/stores/modal";
import { useIsFetching, useQueryClient } from "@tanstack/react-query";
import { Session } from "next-auth";
import { useState } from "react";
import { useSetCoinStore } from "@/stores/deploy";
import CreCoinModal from "./CreCoinlModal";
import formCss from "./Form.module.scss";
import dayjs from "@/libraries/dayjs";
import { DateValue } from "@mantine/dates";

interface FormProps {
  session: Session;
}
const today = new Date();

export default function Form({ session }: FormProps) {
  const queryClient = useQueryClient();
  const [date, setDate] = useState<[DateValue, DateValue]>([
    dayjs().subtract(1, "day").toDate(),
    dayjs().toDate(),
  ]);

  const isFetching = useIsFetching({ queryKey: ["TBW_000300_Q01"] });

  const actions = useSetCoinStore();
  const modalAction = useSetModalStore();

  const openModal = () => {
    modalAction.push(CreCoinModal, { props: { session } });
  };

  const onDateChange = (date: [DateValue, DateValue]) => {
    setDate(() => date);
  };

  const onDateBtnClick = (startDate: DateValue) => {
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
    <form className={formCss.navWrap} onSubmit={onSubmit}>
      <BalanceViewer session={session} />
      <div className={formCss.inputWrap}>
        <HistoryFilter date={date} onDateChange={onDateChange} onDateBtnClick={onDateBtnClick} />
        <button className={btnCss.navBtn} type="submit" disabled={isFetching > 0}>
          내역 조회
        </button>
      </div>
      <div className={formCss.btnWrap}>
        <button className={btnCss.navBtn} onClick={openModal} type="button">
          USDL 발행
        </button>
      </div>
    </form>
  );
}
