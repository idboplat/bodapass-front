import { navBtn } from "@/app/_component/btn/btn.css";
import LabelInput from "@/app/_component/input/LabelInput";
import TextSelect from "@/app/_component/select/TextSelect";
import { CORP_GRP_ENTRY, CORP_GRP_KEY, CORP_GRP_VALUE } from "@/app/_const/tp";
import { useSetModalStore } from "@/app/_lib/modalStore";
import { ChangeEvent, useState } from "react";
import { useSetCorpStore } from "../_lib/store";
import CreCorpModal from "./CreCorpModal";
import { btnWrap, inputWrap, navWrap } from "./nav.css";
import { Session } from "next-auth";

enum CorpNavForm {
  corpNm = "corpNm",
}

interface FormProps {
  session: Session;
}

export default function Form({ session }: FormProps) {
  // const [date, setDate] = useState<[DateType, DateType]>([new Date(), new Date()]);
  const [corpNm, setCorpNm] = useState("");
  const [corpGrpValue, setCorpGrpValue] = useState("");

  const actions = useSetCorpStore();
  const modalAction = useSetModalStore();

  const openModal = () => {
    modalAction.push(CreCorpModal, { props: { session } });
  };

  // const onChange = (date: [DateType, DateType]) => {
  //   setDate(() => date);
  // };

  const onChangeSelect = (value: string) => {
    setCorpGrpValue(() => value);
  };

  // const onDateBtnClick = (startDate: DateType, endDate: DateType) => {
  //   actions.setState({ date: [startDate, endDate] });
  // };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    switch (id) {
      case CorpNavForm.corpNm:
        setCorpNm(() => value);
        break;
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const idx = CORP_GRP_ENTRY.findIndex((item) => item[1] === corpGrpValue);
    //idx가 없으면 ""로 설정
    actions.setState(corpNm, CORP_GRP_KEY?.[idx] || "");
  };

  const today = new Date();

  return (
    <form className={navWrap} onSubmit={onSubmit}>
      <div className={inputWrap}>
        <div>
          <LabelInput
            label="회사명"
            value={corpNm}
            id={CorpNavForm.corpNm}
            onChange={onChange}
            onReset={() => setCorpNm("")}
          />
        </div>
        <div>
          <TextSelect
            value={corpGrpValue}
            onChange={onChangeSelect}
            items={["", ...CORP_GRP_VALUE]}
            placeholder="회사유형"
            style={{
              height: 35.6,
              width: 120,
            }}
          />
        </div>
      </div>
      {/* <div className={historyFilterwrap}>
        <div className={btnWrap}>
          <DateBtn onClick={() => onDateBtnClick(addDays(today, -1), today)}>1D</DateBtn>
          <DateBtn onClick={() => onDateBtnClick(addWeeks(today, -1), today)}>1W</DateBtn>
          <DateBtn onClick={() => onDateBtnClick(addMonths(today, -1), today)}>1M</DateBtn>
          <DateBtn onClick={() => onDateBtnClick(addMonths(today, -3), today)}>3M</DateBtn>
        </div>
        <div className={datePickerWrap}>
          <div>등록일</div>
          <RangePicker date={date} onChange={onChange} />
        </div>
      </div> */}
      <div className={btnWrap}>
        <button type="button" className={navBtn} onClick={openModal}>
          회사 등록
        </button>
        <button type="submit" className={navBtn}>
          조회
        </button>
      </div>
    </form>
  );
}
