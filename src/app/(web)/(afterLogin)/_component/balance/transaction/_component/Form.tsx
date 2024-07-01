import { navBtn } from "@/app/_component/btn/btn.css";
import LabelInput from "@/app/_component/input/LabelInput";
import TextSelect from "@/app/_component/select/TextSelect";
import { MVIO_RMRK_ITEM, MVIO_TP_ITEM, RGST_STAT_ITEM, findEntity } from "@/app/_const/tp";
import DatePicker, { DateType } from "@/app/_component/datepicker/DatePicker";
import { useState } from "react";
import { useSetTransactionStore } from "../_lib/store";
import { btnBox, datePickerWrap, inputWrap, navWrap } from "./nav.css";
import { useSetModalStore } from "@/app/_lib/modalStore";
import ReqModal from "./ReqModal";

interface FormProps {
  showReqBtn: boolean;
}

export default function Form({ showReqBtn }: FormProps) {
  const [mvioDd, setMvioDd] = useState<DateType>(null);
  const [instCd, setInstCd] = useState("");
  const [mvioTp, setMvioTp] = useState("");
  const [mvioRmrkTp, setMvioRmrkTp] = useState("");
  const [rqstStatTp, setRqstStatTp] = useState("");
  const actions = useSetTransactionStore();
  const modalStore = useSetModalStore();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    actions.setState({
      mvioTp: findEntity(MVIO_TP_ITEM, mvioTp)?.[0] || "",
      mvioRmrkTp: findEntity(MVIO_RMRK_ITEM, mvioRmrkTp)?.[0] || "",
      rqstStatTp: findEntity(RGST_STAT_ITEM, rqstStatTp)?.[0] || "",
      instCd,
      mvioDd,
    });
  };

  const onChangeDatePicker = (date: DateType) => {
    setMvioDd(() => date);
  };

  const openReqModal = async () => {
    await modalStore.push(ReqModal, { props: {} });
  };
  const today = new Date();

  return (
    <form className={navWrap} onSubmit={onSubmit}>
      <div className={inputWrap}>
        <div className={datePickerWrap}>
          <DatePicker
            style={{ width: 216 }}
            startDate={mvioDd}
            onChange={onChangeDatePicker}
            placeholder="일자"
          />
        </div>
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
        <div>
          <TextSelect
            value={mvioTp}
            onChange={(value: string) => setMvioTp(() => value)}
            items={["*", "입고", "출고"]}
            placeholder="입출 구분"
            style={{
              height: 36,
              width: 90,
              textAlign: "center",
            }}
          />
        </div>
        <div>
          <TextSelect
            value={mvioRmrkTp}
            onChange={(value: string) => setMvioRmrkTp(() => value)}
            items={["*", "매매손익", "매매 수수료", "입출고"]}
            placeholder="적요 구분"
            style={{
              height: 36,
              width: 90,
              textAlign: "center",
            }}
          />
        </div>
        <div>
          <TextSelect
            value={rqstStatTp}
            onChange={(value: string) => setRqstStatTp(() => value)}
            items={["*", "접수", "취소", "거부", "완료"]}
            placeholder="상태 구분"
            style={{
              height: 36,
              width: 90,
              textAlign: "center",
            }}
          />
        </div>
      </div>
      <div className={btnBox}>
        {showReqBtn && (
          <button type="button" onClick={openReqModal} className={navBtn}>
            구매 신청
          </button>
        )}
        <button className={navBtn} type="submit">
          조회
        </button>
      </div>
    </form>
  );
}
