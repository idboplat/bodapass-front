import { navBtn } from "@/app/_component/btn/btn.css";
import { DateType } from "@/app/_component/datepicker/DatePicker";
import LabelInput from "@/app/_component/input/LabelInput";
import SelectLabel from "@/app/_component/select/SelectLabel";
import TextSelect from "@/app/_component/select/TextSelect";
import { findEntity, MVIO_TP_ITEM } from "@/app/_const/tp";
import { Session } from "next-auth";
import { ChangeEvent, useState } from "react";
import { usePnlCorpStore } from "../_lib/store";
import { btnWrap, inputWrap, navWrap, selectBoxWrap } from "./nav.css";
import { useIsFetching } from "@tanstack/react-query";
import HistoryFilter from "@/app/_component/historyFilter/HistoryFilter";

enum PnlNavForm {
  instCd = "instCd",
}

interface FormProps {
  session: Session;
}

const today = new Date();

export default function Form({ session }: FormProps) {
  const [date, setDate] = useState<[DateType, DateType]>([null, null]);
  const [instCd, setInstCd] = useState("");
  const [mvioTp, setMvioTp] = useState("전체");

  const isFetching = useIsFetching({ queryKey: ["TBW_006000_R01"] });

  const actions = usePnlCorpStore();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    switch (id) {
      case PnlNavForm.instCd:
        setInstCd(() => value);
        break;
    }
  };

  const onChangeSelect = (value: string) => {
    setMvioTp(() => value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    actions.setState({
      mvioTp,
      instCd,
      date,
    });
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
            id={PnlNavForm.instCd}
            onChange={onChange}
            onReset={() => setInstCd("")}
            style={{
              width: 160,
            }}
          />
        </div>
        <div className={selectBoxWrap}>
          <SelectLabel>입출 구분</SelectLabel>
          <TextSelect
            value={mvioTp}
            onChange={onChangeSelect}
            items={["전체", "입고", "출고"]}
            style={{
              height: 36,
              width: 100,
              textAlign: "center",
            }}
          />
        </div>
        <button type="submit" className={navBtn} disabled={isFetching > 0}>
          조회
        </button>
      </div>
      <div className={btnWrap}></div>
    </form>
  );
}
