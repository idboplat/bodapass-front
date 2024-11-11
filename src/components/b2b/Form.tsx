import BalanceViewer from "@/components/BalanceViewer";
import btnCss from "@/components/common/btn/Btn.module.scss";
import { DateType } from "@/components/common/datepicker/DatePicker";
import HistoryFilter from "@/components/common/historyFilter/HistoryFilter";
import LabelInput from "@/components/common/input/LabelInput";
import LabelSelect from "@/components/common/select/LabelSelect";
import TextSelect from "@/components/common/select/TextSelect";
import { useSetTransactionCorpStore } from "@/stores/b2b";
import { useSetModalStore } from "@/stores/modal";
import { useIsFetching, useQueryClient } from "@tanstack/react-query";
import { addDays } from "date-fns";
import { Session } from "next-auth";
import { useState } from "react";
import forCss from "./Form.module.scss";
import ReqModal from "./ReqModal";

interface FormProps {
  session: Session;
}

const today = new Date();

export default function Form({ session }: FormProps) {
  const [date, setDate] = useState<[DateType, DateType]>([addDays(today, -1), today]);
  const [instCd, setInstCd] = useState("");
  const [rqstStatTp, setRqstStatTp] = useState("전체");

  const isFetching = useIsFetching({ queryKey: ["TBW_001000_Q01"] });

  const actions = useSetTransactionCorpStore();
  const modalStore = useSetModalStore();

  const queryClient = useQueryClient();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    actions.setState({
      rqstStatTp,
      instCd,
      date,
    });
    // 잔고 재조회
    queryClient.invalidateQueries({ queryKey: ["TBW_002000_S02"] });
    // 입금 신청 내역 재조회
    queryClient.invalidateQueries({ queryKey: ["TBW_001000_Q03"] });
  };

  const openReqModal = async () => {
    await modalStore.push(ReqModal, { props: { session } });
  };

  const onDateChange = (date: [DateType, DateType]) => {
    setDate(() => date);
  };

  const onDateBtnClick = (startDate: DateType) => {
    actions.setState({ date: [startDate, today] });
    setDate(() => [startDate, today]);
  };

  return (
    <form className={forCss.navWrap} onSubmit={onSubmit}>
      <BalanceViewer session={session} />
      <div className={forCss.inputWrap}>
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
        <div className={forCss.selectBoxWrap}>
          <LabelSelect>상태 구분</LabelSelect>
          <TextSelect
            value={rqstStatTp}
            onChange={(value: string) => setRqstStatTp(() => value)}
            items={["전체", "승인 대기", "신청 취소", "승인 반려", "승인 완료"]}
            style={{
              height: 36,
              width: 90,
              textAlign: "center",
            }}
          />
        </div>
        <button className={btnCss.navBtn} type="submit" disabled={isFetching > 0}>
          조회
        </button>
      </div>
      <div className={forCss.btnBox}>
        {/* <button type="button" onClick={openReqModal} className={navBtn}>
          구매 신청
        </button> */}
      </div>
    </form>
  );
}
