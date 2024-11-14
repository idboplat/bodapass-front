import btnCss from "@/components/common/btn/Btn.module.scss";
import LabelInput from "@/components/common/input/LabelInput";
import LabelSelect from "@/components/common/select/LabelSelect";
import TextSelect from "@/components/common/select/TextSelect";
import { corpGrpItemsMap, corpGrpTpItemsMap, getCorpGrpTpItems } from "@/constants/corp/map";
import { useSetCorpStore } from "@/stores/corp";
import { useSetModalStore } from "@/stores/modal";
import { useIsFetching } from "@tanstack/react-query";
import { Session } from "next-auth";
import { ChangeEvent, useState } from "react";
import CreCorpModal from "./CreCorpModal";
import formCss from "./Form.module.scss";

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
    <form className={formCss.navWrap} onSubmit={onSubmit}>
      <div className={formCss.inputWrap}>
        <div>
          <LabelInput
            label="회사 명"
            id={CorpNavForm.corpNm}
            w={160}
            h={40}
            value={corpNm}
            onChange={onChange}
            onReset={() => setCorpNm("")}
          />
        </div>
        <div className={formCss.selectBoxWrap}>
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
        <button type="submit" className={btnCss.navBtn} disabled={isFetching > 0}>
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
      <div className={formCss.btnWrap}>
        <button type="button" onClick={openModal} className={btnCss.navBtn}>
          회사 생성
        </button>
      </div>
    </form>
  );
}
