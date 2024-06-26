import { navBtn } from "@/app/_component/btn/btn.css";
import LabelInput from "@/app/_component/input/LabelInput";
import TextSelect from "@/app/_component/select/TextSelect";
import { MVIO_RMRK_ITEM, RGST_STAT_ITEM, findEntity } from "@/app/_const/tp";
import DatePicker, { DateType } from "@web/(afterLogin)/_component/datepicker/DatePicker";
import { useState } from "react";
import { useSetTransactionStore } from "../_lib/store";
import { datePickerWrap, inputWrap, navWrap } from "./nav.css";

export default function Form() {
  const [mvioDd, setMvioDd] = useState<DateType>(null);
  const [instCd, setInstCd] = useState("");
  const [mvioTp, setMvioTp] = useState("");
  const [mvioRmrkTp, setMvioRmrkTp] = useState("");
  const [rqstStatTp, setRqstStatTp] = useState("");
  const actions = useSetTransactionStore();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    actions.setState({
      mvioTp: mvioTp === "입고" ? "I" : "O",
      mvioRmrkTp: findEntity(MVIO_RMRK_ITEM, mvioRmrkTp)?.[0] || "",
      rqstStatTp: findEntity(RGST_STAT_ITEM, rqstStatTp)?.[0] || "",
      instCd,
      mvioDd,
    });
  };

  const onChangeDatePicker = (date: DateType) => {
    setMvioDd(() => date);
  };

  const today = new Date();

  return (
    <form className={navWrap} onSubmit={onSubmit}>
      <div className={inputWrap}>
        <div>
          <LabelInput
            label="종목코드"
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
            placeholder="입출고 구분"
            style={{
              height: 35.6,
              width: 120,
            }}
          />
        </div>
        <div>
          <TextSelect
            value={mvioRmrkTp}
            onChange={(value: string) => setMvioRmrkTp(() => value)}
            items={["*", "매매손익", "매매 수수료", "입출고"]}
            placeholder="입출고 적요 구분"
            style={{
              height: 35.6,
              width: 120,
            }}
          />
        </div>
        <div>
          <TextSelect
            value={rqstStatTp}
            onChange={(value: string) => setRqstStatTp(() => value)}
            items={["*", "접수", "취소", "거부", "완료"]}
            placeholder="신청 상태 구분"
            style={{
              height: 35.6,
              width: 120,
            }}
          />
        </div>
        <div className={datePickerWrap}>
          <DatePicker startDate={mvioDd} onChange={onChangeDatePicker} />
        </div>
      </div>
      <div>
        <button className={navBtn} type="submit">
          조회
        </button>
      </div>
    </form>
  );
}
