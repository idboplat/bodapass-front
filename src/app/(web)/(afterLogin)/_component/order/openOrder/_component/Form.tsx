import btnCss from "@/app/_component/btn/Btn.module.scss";
import { DateType } from "@/app/_component/datepicker/DatePicker";
import LabelInput from "@/app/_component/input/LabelInput";
import LabelSelect from "@/app/_component/select/LabelSelect";
import TextSelect from "@/app/_component/select/TextSelect";
import { Session } from "next-auth";
import { ChangeEvent, useState } from "react";
import { useSetOpenOrderStore } from "../_lib/store";
import formCss from "./Form.module.scss";
import { useIsFetching } from "@tanstack/react-query";
import HistoryFilter from "@/app/_component/historyFilter/HistoryFilter";
import { addDays } from "date-fns";

enum OpenOrderNavForm {
  instCd = "instCd",
  byslTp = "byslTp",
}

interface FormProps {
  session: Session;
}

const today = new Date();

export default function Form({ session }: FormProps) {
  const [date, setDate] = useState<[DateType, DateType]>([addDays(today, -1), today]);
  const [instCd, setInstCd] = useState("");
  const [byslTp, setByslTp] = useState("전체");

  const isFetching = useIsFetching({ queryKey: ["TBW_006000_Q01"] });

  const actions = useSetOpenOrderStore();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    switch (id) {
      case OpenOrderNavForm.instCd:
        setInstCd(() => value);
        break;
    }
  };

  const onChangeSelect = (value: string) => {
    setByslTp(() => value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    actions.setState({
      byslTp,
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
    <form className={formCss.navWrap} onSubmit={onSubmit}>
      <div className={formCss.inputWrap}>
        <HistoryFilter date={date} onDateChange={onDateChange} onDateBtnClick={onDateBtnClick} />
        <div>
          <LabelInput
            label="종목 코드"
            value={instCd}
            id={OpenOrderNavForm.instCd}
            onChange={onChange}
            onReset={() => setInstCd("")}
            style={{
              width: 160,
            }}
          />
        </div>
        <div className={formCss.selectBoxWrap}>
          <LabelSelect>매수매도 구분</LabelSelect>
          <TextSelect
            value={byslTp}
            onChange={onChangeSelect}
            items={["전체", "매수", "매도"]}
            style={{
              height: 36,
              width: 100,
              textAlign: "center",
            }}
          />
        </div>
        <button type="submit" className={btnCss.navBtn} disabled={isFetching > 0}>
          조회
        </button>
      </div>
      <div className={formCss.btnWrap}></div>
    </form>
  );
}
