import Modal from "@/app/_component/modal/Modal";
import { ModalProps } from "@/app/_lib/modalStore";
import * as style from "@/app/_component/modal/modal.css";
import { modalDefaultBtn } from "@/app/_component/modal/modalBtn.css";
import ModalCloseBtn from "@/app/_component/modal/ModalCloseBtn";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import LabelInput from "@/app/_component/input/LabelInput";
import TextSelect from "@/app/_component/select/TextSelect";
import { checkBoxDiv, inputBox } from "./createCorpModal.css";
import CheckBox from "@/app/_component/input/CheckBox";

const ID = "createCorpModal";

enum CreateCorpInput {
  type = ID + "Type",
  corpName = ID + "CorpName",
  pw = ID + "Pw",
}

interface CreateCorpModalProps {}

export default function CreateCorpModal({ onClose, onSuccess }: ModalProps<CreateCorpModalProps>) {
  const [type, setType] = useState<string | null>(null);
  const [corpName, setCorpName] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState(false);

  const mutation = useMutation({
    mutationKey: ["서비스 아이디"],
    mutationFn: async () => {
      console.table({ type, corpName: corpName.trim(), pw });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      mutation.mutate();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    switch (id) {
      case CreateCorpInput.corpName:
        setCorpName(() => value);
        break;
      case CreateCorpInput.pw:
        setPw(() => value);
        break;
    }
  };

  const onChangeSelect = (value: string) => setType(() => value);

  const togglePwCheck = () => setPwCheck((pre) => !pre);

  return (
    <Modal id={ID} onClose={onClose}>
      <form onSubmit={handleSubmit} className={style.modalCenterContent}>
        <ModalCloseBtn onClose={onClose} />
        <div>
          <div className={style.modalHeader}>
            <h3 className={style.modalTitle}>회사등록</h3>
          </div>
          <div className={inputBox}>
            <TextSelect
              value={type}
              onChange={onChangeSelect}
              items={["중개", "거래소"]}
              placeholder="회사유형 선택"
              style={{
                height: 35,
              }}
            />
          </div>
          <div className={inputBox}>
            <LabelInput
              label="회사명"
              value={corpName}
              id={CreateCorpInput.corpName}
              onChange={onChangeInput}
              onReset={() => setCorpName("")}
            />
          </div>
          <div className={inputBox}>
            <LabelInput
              label="Main 관리자 비밀번호"
              value={pw}
              id={CreateCorpInput.pw}
              onChange={onChangeInput}
              type={pwCheck ? "text" : "password"}
              onReset={() => setPw("")}
            />
            <div className={checkBoxDiv}>
              <CheckBox value={pwCheck} onClick={togglePwCheck} label={"비밀번호 확인"} />
            </div>
          </div>
        </div>
        <div className={style.modalBtnBox}>
          <button className={modalDefaultBtn} type="submit" disabled={mutation.isPending}>
            등록
          </button>
        </div>
      </form>
    </Modal>
  );
}
