import btnCss from "@/components/common/btn/Btn.module.scss";
import HistoryFilter from "@/components/common/historyFilter/HistoryFilter";
import LabelInput from "@/components/common/input/LabelInput";
import LabelSelect from "@/components/common/select/LabelSelect";
import TextSelect from "@/components/common/select/TextSelect";
import dayjs from "@/libraries/dayjs";
import { useSetOpenOrderStore } from "@/stores/openOrder";
import { useIsFetching } from "@tanstack/react-query";
import { Session } from "next-auth";
import { ChangeEvent, useState } from "react";
import formCss from "./Form.module.scss";
import { DateValue } from "@mantine/dates";

enum OpenOrderNavForm {
  instCd = "instCd",
  byslTp = "byslTp",
}

interface FormProps {
  session: Session;
}

const today = new Date();

export default function Form({ session }: FormProps) {
  const [instCd, setInstCd] = useState("");
  const [byslTp, setByslTp] = useState("전체");
  const [date, setDate] = useState<[DateValue, DateValue]>([
    dayjs().subtract(1, "day").toDate(),
    dayjs().toDate(),
  ]);

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

  const onDateChange = (date: [DateValue, DateValue]) => {
    setDate(() => date);
  };

  const onDateBtnClick = (startDate: DateValue) => {
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
