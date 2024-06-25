"use client";

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

export default function Nav() {
  const [mvioDd, setMvioDd] = useState<DateType>(new Date());
  const [instCd, setInstCd] = useState("");
  const [mvioTp, setMvioTp] = useState("");
  const [mvioRmrkTp, setMvioRmrkTp] = useState("");
  const [rqstStatTp, setRqstStatTp] = useState("");
  const actions = useSetTransactionStore();

  const dateToString = (date: Date | null) => {
    if (!date) return "";
    return format(date, "yyyyMMdd");
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (mvioTp === "입고") {
      actions.setState({ mvioTp: "I" });
    } else if (mvioTp === "출고") {
      actions.setState({ mvioTp: "O" });
    } else {
      actions.setState({ mvioTp: "" });
    }

    if (mvioRmrkTp === "매매손익") {
      actions.setState({ mvioRmrkTp: "1" });
    } else if (mvioRmrkTp === "매매 수수료") {
      actions.setState({ mvioRmrkTp: "2" });
    } else if (mvioRmrkTp === "입출고") {
      actions.setState({ mvioRmrkTp: "3" });
    } else {
      actions.setState({ mvioRmrkTp: "" });
    }

    if (mvioRmrkTp === "매매손익") {
      actions.setState({ mvioRmrkTp: "1" });
    } else if (mvioRmrkTp === "매매 수수료") {
      actions.setState({ mvioRmrkTp: "2" });
    } else if (mvioRmrkTp === "입출고") {
      actions.setState({ mvioRmrkTp: "3" });
    } else {
      actions.setState({ mvioRmrkTp: "" });
    }

    if (mvioRmrkTp === "매매손익") {
      actions.setState({ mvioRmrkTp: "1" });
    } else if (mvioRmrkTp === "매매 수수료") {
      actions.setState({ mvioRmrkTp: "2" });
    } else if (mvioRmrkTp === "입출고") {
      actions.setState({ mvioRmrkTp: "3" });
    } else {
      actions.setState({ mvioRmrkTp: "" });
    }

    actions.setState({ mvioDd: dateToString(mvioDd) });
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
            items={[
              "*",
              "신청 접수(고객)",
              "신청 접수 취소(고객)",
              "신청 접수 거부(관리자)",
              "신청 적용 완료",
            ]}
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
