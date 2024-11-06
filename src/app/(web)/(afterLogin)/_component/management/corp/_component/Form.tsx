import module from "@/app/_component/btn/Btn.module.scss";
import LabelInput from "@/app/_component/input/LabelInput";
import TextSelect from "@/app/_component/select/TextSelect";
import { useSetModalStore } from "@/app/_lib/modalStore";
import { ChangeEvent, useState } from "react";
import { useSetCorpStore } from "../_lib/store";
import CreCorpModal from "./CreCorpModal";
import { btnWrap, inputWrap, navWrap, selectBoxWrap } from "./nav.css";
import { Session } from "next-auth";
import LabelSelect from "@/app/_component/select/LabelSelect";
import { corpGrpItemsMap, corpGrpTpItemsMap, getCorpGrpTpItems } from "../_const/map";
import { useIsFetching } from "@tanstack/react-query";

enum CorpNavForm {
  corpNm = "corpNm",
}

interface FormProps {
  session: Session;
}

export default function Form({ session }: FormProps) {
  // const [date, setDate] = useState<[DateType, DateType]>([new Date(), new Date()]);
  const [corpNm, setCorpNm] = useState("");
  const [corpGrpValue, setCorpGrpValue] = useState("전체");

  const isFetching = useIsFetching({ queryKey: ["TBW_000000_R01"] });

  const actions = useSetCorpStore();
  const modalAction = useSetModalStore();

  const openModal = async () => {
    const corpGrpTpItems = getCorpGrpTpItems(corpGrpItemsMap, session.user.corpGrpTp);
    await modalAction.push(CreCorpModal, { props: { session, corpGrpTpItems } });
  };

  // const onChange = (date: [DateType, DateType]) => {
  //   setDate(() => date);
  // };

  const onChangeCorpGrpSelect = (value: string) => {
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

    actions.setState(corpNm, corpGrpValue);
  };

  const today = new Date();

  return (
    <form className={navWrap} onSubmit={onSubmit}>
      <div className={inputWrap}>
        <div>
          <LabelInput
            label="회사 명"
            value={corpNm}
            id={CorpNavForm.corpNm}
            onChange={onChange}
            onReset={() => setCorpNm("")}
            style={{
              width: 160,
            }}
          />
        </div>
        <div className={selectBoxWrap}>
          <LabelSelect>회사 유형</LabelSelect>
          <TextSelect
            value={corpGrpValue}
            onChange={onChangeCorpGrpSelect}
            items={getCorpGrpTpItems(corpGrpTpItemsMap, session.user.corpGrpTp)}
            style={{
              height: 36,
              width: 100,
              textAlign: "center",
            }}
          />
        </div>
        <button type="submit" className={module.navBtn} disabled={isFetching > 0}>
          조회
        </button>
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
        <button type="button" onClick={openModal} className={module.navBtn}>
          회사 생성
        </button>
      </div>
    </form>
  );
}
