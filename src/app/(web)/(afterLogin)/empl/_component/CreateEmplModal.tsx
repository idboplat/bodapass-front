import DefaultInput from "@/app/_component/input/DefaultInput";
import Modal from "@/app/_component/modal/Modal";
import ModalCloseBtn from "@/app/_component/modal/ModalCloseBtn";
import { modalDefaultBtn } from "@/app/_component/modal/modalBtn.css";
import { ModalProps } from "@/app/_lib/modalStore";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { inputBox, label } from "./createEmplModal.css";
import * as style from "@/app/_component/modal/modal.css";

const ID = "createEmplModal";

enum CreateEmplInput {
  emplName = ID + "EmplName",
  pw = ID + "Pw",
  pwCheck = ID + "PwCheck",
}

interface CreateEmplModalProps {}

export default function CreateEmplModal({ onClose, onSuccess }: ModalProps<CreateEmplModalProps>) {
  const [emplName, setEmplName] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");

  const mutation = useMutation({
    mutationKey: ["서비스 아이디"],
    mutationFn: async () => {
      console.table({ emplName: emplName.trim(), pw, pwCheck });
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
      case CreateEmplInput.emplName:
        setEmplName(() => value);
        break;
      case CreateEmplInput.pw:
        setPw(() => value);
        break;
      case CreateEmplInput.pwCheck:
        setPwCheck(() => value);
        break;
    }
  };

  return (
    <Modal id={ID} onClose={onClose}>
      <form onSubmit={handleSubmit} className={style.modalCenterContent}>
        <ModalCloseBtn onClose={onClose} />
        <div>
          <div className={style.modalHeader}>
            <h3 className={style.modalTitle}>사원등록</h3>
          </div>
          <div className={inputBox}>
            <label className={label} htmlFor={CreateEmplInput.emplName}>
              신규 사원명
            </label>
            <DefaultInput
              id={CreateEmplInput.emplName}
              value={emplName}
              onChange={onChangeInput}
              onReset={() => setEmplName("")}
            />
          </div>
          <div className={inputBox}>
            <label className={label} htmlFor={CreateEmplInput.pw}>
              신규 비밀번호
            </label>
            <DefaultInput
              id={CreateEmplInput.pw}
              value={pw}
              onChange={onChangeInput}
              type={"password"}
              onReset={() => setPw("")}
            />
          </div>
          <div className={inputBox}>
            <label className={label} htmlFor={CreateEmplInput.pwCheck}>
              신규 비밀번호 확인
            </label>
            <DefaultInput
              id={CreateEmplInput.pwCheck}
              value={pwCheck}
              onChange={onChangeInput}
              type={"password"}
              onReset={() => setPwCheck("")}
            />
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
