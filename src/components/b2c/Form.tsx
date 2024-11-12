import BalanceViewer from "@/components/BalanceViewer";
import btnCss from "@/components/common/btn/Btn.module.scss";
import HistoryFilter from "@/components/common/historyFilter/HistoryFilter";
import LabelInput from "@/components/common/input/LabelInput";
import LabelSelect from "@/components/common/select/LabelSelect";
import TextSelect from "@/components/common/select/TextSelect";
import dayjs from "@/libraries/dayjs";
import { useSetTransactionClientStore } from "@/stores/b2c";
import { useSetModalStore } from "@/stores/modal";
import { useIsFetching, useQueryClient } from "@tanstack/react-query";
import { Session } from "next-auth";
import { useState } from "react";
import formCss from "./Form.module.scss";
import { DateValue } from "@mantine/dates";

interface FormProps {
  session: Session;
}
const today = new Date();

export default function Form({ session }: FormProps) {
  const [instCd, setInstCd] = useState("");
  const [mvioTp, setMvioTp] = useState("전체");
  const [rqstStatTp, setRqstStatTp] = useState("전체");
  const [date, setDate] = useState<[DateValue, DateValue]>([
    dayjs().subtract(1, "day").toDate(),
    dayjs().toDate(),
  ]);

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

  const onDateChange = (date: [DateValue, DateValue]) => {
    setDate(() => date);
  };

  const onDateBtnClick = (startDate: DateValue) => {
    const date: [DateValue, DateValue] = [startDate, dayjs().toDate()];
    actions.setState({ date });
    setDate(() => date);
  };

  return (
    <form className={formCss.navWrap} onSubmit={onSubmit}>
      <BalanceViewer session={session} />
      <div className={formCss.inputWrap}>
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
        <div className={formCss.selectBoxWrap}>
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
        <div className={formCss.selectBoxWrap}>
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
        <button className={btnCss.navBtn} type="submit" disabled={isFetching > 0}>
          조회
        </button>
      </div>
      <div className={formCss.btnBox}></div>
    </form>
  );
}
