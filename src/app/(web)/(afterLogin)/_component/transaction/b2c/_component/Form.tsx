import css from "@/app/_component/btn/Btn.module.scss";
import { DateType } from "@/app/_component/datepicker/DatePicker";
import HistoryFilter from "@/app/_component/historyFilter/HistoryFilter";
import LabelInput from "@/app/_component/input/LabelInput";
import LabelSelect from "@/app/_component/select/LabelSelect";
import TextSelect from "@/app/_component/select/TextSelect";
import { useSetModalStore } from "@/app/_lib/modalStore";
import { useIsFetching, useQueryClient } from "@tanstack/react-query";
import { Session } from "next-auth";
import { useState } from "react";
import { useSetTransactionClientStore } from "../_lib/store";
import { btnBox, inputWrap, navWrap, selectBoxWrap } from "./nav.css";
import BalanceViewer from "@transaction/_component/BalanceViewer";
import { addDays } from "date-fns";

interface FormProps {
  session: Session;
}
const today = new Date();

export default function Form({ session }: FormProps) {
  const [date, setDate] = useState<[DateType, DateType]>([addDays(today, -1), today]);
  const [instCd, setInstCd] = useState("");
  const [mvioTp, setMvioTp] = useState("전체");
  const [rqstStatTp, setRqstStatTp] = useState("전체");

  const isFetching = useIsFetching({ queryKey: ["TBW_001000_R01"] });

  const actions = useSetTransactionClientStore();
  const modalStore = useSetModalStore();

  const queryClient = useQueryClient();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    actions.setState({
      mvioTp,
      rqstStatTp,
      instCd,
      date,
    });
    // 잔고 재조회
    queryClient.invalidateQueries({ queryKey: ["TBW_002000_S02"] });
    // 입금 신청 내역 재조회
    queryClient.invalidateQueries({ queryKey: ["TBW_001000_Q03"] });
  };

  const onDateChange = (date: [DateType, DateType]) => {
    setDate(() => date);
  };

  const onDateBtnClick = (startDate: DateType) => {
    actions.setState({ date: [startDate, today] });
    setDate(() => [startDate, today]);
  };

  return (
    <form className={navWrap} onSubmit={onSubmit}>
      <BalanceViewer session={session} />
      <div className={inputWrap}>
        <HistoryFilter date={date} onDateChange={onDateChange} onDateBtnClick={onDateBtnClick} />
        <div>
          <LabelInput
            label="종목 코드"
            value={instCd}
            id="instCd"
            onChange={(e) => setInstCd(() => e.target.value)}
            onReset={() => setInstCd(() => "")}
            style={{ width: 120 }}
          />
        </div>
        <div className={selectBoxWrap}>
          <LabelSelect>입출 구분</LabelSelect>
          <TextSelect
            value={mvioTp}
            onChange={(value: string) => setMvioTp(() => value)}
            items={["전체", "입고", "출고"]}
            style={{
              height: 36,
              width: 90,
              textAlign: "center",
            }}
          />
        </div>
        <div className={selectBoxWrap}>
          <LabelSelect>상태 구분</LabelSelect>
          <TextSelect
            value={rqstStatTp}
            onChange={(value) => setRqstStatTp(() => value)}
            items={["전체", "승인 대기", "신청 취소", "승인 반려", "승인 완료"]}
            style={{
              height: 36,
              width: 90,
              textAlign: "center",
            }}
          />
        </div>
        <button className={css.navBtn} type="submit" disabled={isFetching > 0}>
          조회
        </button>
      </div>
      <div className={btnBox}></div>
    </form>
  );
}
