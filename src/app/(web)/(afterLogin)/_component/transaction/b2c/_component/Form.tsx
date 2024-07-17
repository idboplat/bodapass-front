import { navBtn } from "@/app/_component/btn/btn.css";
import LabelInput from "@/app/_component/input/LabelInput";
import TextSelect from "@/app/_component/select/TextSelect";
import { MVIO_RMRK_ITEM, MVIO_TP_ITEM, RGST_STAT_ITEM, findEntity } from "@/app/_const/tp";
import DatePicker, { DateType } from "@/app/_component/datepicker/DatePicker";
import { useState } from "react";
import { useSetTransactionClientStore } from "../_lib/store";
import { btnBox, datePickerWrap, selectBoxWrap, inputWrap, navWrap } from "./nav.css";
import { useSetModalStore } from "@/app/_lib/modalStore";
import { Session } from "next-auth";
import { useQueryClient } from "@tanstack/react-query";
import SelectLabel from "@/app/_component/select/SelectLabel";

interface FormProps {
  session: Session;
}

export default function Form({ session }: FormProps) {
  const [mvioDd, setMvioDd] = useState<DateType>(null);
  const [instCd, setInstCd] = useState("");
  const [mvioTp, setMvioTp] = useState("전체");
  const [mvioRmrkTp, setMvioRmrkTp] = useState("전체");
  const [rqstStatTp, setRqstStatTp] = useState("전체");
  const actions = useSetTransactionClientStore();
  const modalStore = useSetModalStore();

  const queryClient = useQueryClient();

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
            items={["전체", "신청", "취소", "거부", "완료"]}
            style={{
              height: 36,
              width: 90,
              textAlign: "center",
            }}
          />
        </div>
        <button className={navBtn} type="submit">
          조회
        </button>
      </div>
      <div className={btnBox}></div>
    </form>
  );
}
