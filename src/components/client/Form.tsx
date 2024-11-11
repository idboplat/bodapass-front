import btnCss from "@/components/common/btn/Btn.module.scss";
import { DateType } from "@/components/common/datepicker/DatePicker";
import LabelInput from "@/components/common/input/LabelInput";
import { useSetClientStore } from "@/stores/client";
import { useIsFetching } from "@tanstack/react-query";
import { addDays } from "date-fns";
import { Session } from "next-auth";
import { useState } from "react";
import formCss from "./Form.module.scss";

const ID = "clientNavForm";

enum ClientNavForm {
  extnUserId = ID + "Id",
  date = ID + "Date",
}

interface FormProps {
  session: Session;
}

export default function Form({ session }: FormProps) {
  const [extnUserId, setExtnUserId] = useState("");
  const [date, setDate] = useState<[DateType, DateType]>([addDays(new Date(), -1), new Date()]);
  const actions = useSetClientStore();

  const isFetching = useIsFetching({ queryKey: ["TBW_000001_S01"] });

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    switch (id) {
      case ClientNavForm.extnUserId:
        setExtnUserId(() => value);
        break;
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    actions.setState(extnUserId, date);
  };

  return (
    <form className={formCss.navWrap} onSubmit={onSubmit}>
      <div className={formCss.leftWrap}>
        <div className={formCss.inputWrap}>
          <div>
            <LabelInput
              label="사용자 ID"
              value={extnUserId}
              id={ClientNavForm.extnUserId}
              onChange={onChangeInput}
              style={{ width: 160 }}
              onReset={() => setExtnUserId(() => "")}
            />
          </div>
          <button type="submit" className={btnCss.navBtn} disabled={isFetching > 0}>
            조회
          </button>
        </div>
        {/* <div className={datePickerWrap}>
      <div>등록일</div>
      <RangePicker date={date} onChange={onDateChange} />
    </div> */}
      </div>
      <div className={formCss.btnWrap}></div>
    </form>
  );
}
