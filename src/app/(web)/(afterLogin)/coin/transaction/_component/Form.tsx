import DateBtn from "@/app/_component/btn/DateBtn";
import { navWrap, historyFilterwrap, btnWrap, inputWrap, datePickerWrap } from "./nav.css";
import { useTransactionStore, useSetTransactionStore } from "../_lib/store";
import RangePicker from "@web/(afterLogin)/_component/datepicker/RangePicker";
import { addDays, addMonths, addWeeks, format, set } from "date-fns";
import DatePicker, { DateType } from "@web/(afterLogin)/_component/datepicker/DatePicker";
import { navBtn } from "@/app/_component/btn/btn.css";
import LabelInput from "@/app/_component/input/LabelInput";
import { useState } from "react";
import TextSelect from "@/app/_component/select/TextSelect";
import { dateToString } from "@/app/_lib/dateFormatter";

export default function Form() {
  const [mvioDd, setMvioDd] = useState<DateType>(null);
  const [instCd, setInstCd] = useState("");
  const [mvioTp, setMvioTp] = useState("");
  const [mvioRmrkTp, setMvioRmrkTp] = useState("");
  const [rqstStatTp, setRqstStatTp] = useState("");
  const actions = useSetTransactionStore();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newState = {
      mvioTp: mvioTp === "입고" ? "I" : "O",
      mvioRmrkTp: "",
      rqstStatTp: "",
      instCd,
      mvioDd,
    };

    if (mvioRmrkTp === "매매손익") {
      newState.mvioRmrkTp = "1";
    } else if (mvioRmrkTp === "매매 수수료") {
      newState.mvioRmrkTp = "2";
    } else if (mvioRmrkTp === "입출고") {
      newState.mvioRmrkTp = "3";
    }

    if (rqstStatTp === "접수") {
      newState.rqstStatTp = "REQ";
    } else if (rqstStatTp === "취소") {
      newState.rqstStatTp = "CAN";
    } else if (rqstStatTp === "거부") {
      newState.rqstStatTp = "REJ";
    } else if (rqstStatTp === "완료") {
      newState.rqstStatTp = "APL";
    }

    actions.setState(newState);
  };

  const onChangeDatePicker = (date: DateType) => {
    setMvioDd(() => date);
  };

  const today = new Date();

  return (
    <form className={navWrap} onSubmit={onSubmit}>
      <div className={inputWrap}>
        <div className={datePickerWrap}>
          <label>입출고 일자</label>
          <DatePicker startDate={mvioDd} onChange={onChangeDatePicker} />
        </div>
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
              width: 100,
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
              width: 150,
            }}
          />
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
