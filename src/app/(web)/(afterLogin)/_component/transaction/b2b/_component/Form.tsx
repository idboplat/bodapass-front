import { navBtn } from "@/app/_component/btn/btn.css";
import { DateType } from "@/app/_component/datepicker/DatePicker";
import HistoryFilter from "@/app/_component/historyFilter/HistoryFilter";
import LabelInput from "@/app/_component/input/LabelInput";
import SelectLabel from "@/app/_component/select/SelectLabel";
import TextSelect from "@/app/_component/select/TextSelect";
import { useSetModalStore } from "@/app/_lib/modalStore";
import { useIsFetching } from "@tanstack/react-query";
import { Session } from "next-auth";
import { useState } from "react";
import { useSetTransactionCorpStore } from "../_lib/store";
import { btnBox, inputWrap, navWrap, selectBoxWrap } from "./nav.css";
import ReqModal from "./ReqModal";

interface FormProps {
  session: Session;
  showReqBtn: boolean;
}

const today = new Date();

export default function Form({ session, showReqBtn }: FormProps) {
  const [date, setDate] = useState<[DateType, DateType]>([null, null]);
  const [instCd, setInstCd] = useState("");
  const [mvioTp, setMvioTp] = useState("전체");
  const [mvioRmrkTp, setMvioRmrkTp] = useState("전체");
  const [rqstStatTp, setRqstStatTp] = useState("전체");

  const isFetching = useIsFetching({ queryKey: ["TBW_001000_Q01"] });

  const actions = useSetTransactionCorpStore();
  const modalStore = useSetModalStore();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    actions.setState({
      mvioTp,
      mvioRmrkTp,
      rqstStatTp,
      instCd,
      date,
    });
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
    <form className={navWrap} onSubmit={onSubmit}>
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
          <SelectLabel>입출 구분</SelectLabel>
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
          <SelectLabel>적요 구분</SelectLabel>
          <TextSelect
            value={mvioRmrkTp}
            onChange={(value: string) => setMvioRmrkTp(() => value)}
            items={["전체", "매매손익", "매매 수수료", "입출고"]}
            style={{
              height: 36,
              width: 90,
              textAlign: "center",
            }}
          />
        </div>
        <div className={selectBoxWrap}>
          <SelectLabel>상태 구분</SelectLabel>
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
        <button className={navBtn} type="submit" disabled={isFetching > 0}>
          조회
        </button>
      </div>
      <div className={btnBox}>
        {showReqBtn && (
          <button type="button" onClick={openReqModal} className={navBtn}>
            구매 신청
          </button>
        )}
      </div>
    </form>
  );
}
