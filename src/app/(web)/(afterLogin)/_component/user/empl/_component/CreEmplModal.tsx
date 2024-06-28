import DefaultInput from "@/app/_component/input/DefaultInput";
import ErrorModal from "@/app/_component/modal/ErrorModal";
import Modal from "@/app/_component/modal/Modal";
import ModalCloseBtn from "@/app/_component/modal/ModalCloseBtn";
import * as css from "@/app/_component/modal/modal.css";
import { modalDefaultBtn } from "@/app/_component/modal/modalBtn.css";
import { ModalProps, useSetModalStore } from "@/app/_lib/modalStore";
import callTms from "@/model/callTms";
import { TBW_000010_P01 } from "@/type/api";
import { useMutation } from "@tanstack/react-query";
import { Session } from "next-auth";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useSetEmplStore } from "../_lib/store";
import { inputBox, label, pwCheckBox } from "./creEmplModal.css";
import { input } from "@web/(beforeLogin)/login/_component/loginForm.css";

const ID = "creEmplModal";

enum CreEmplInput {
  extnUserId = ID + "ExtnUserId",
  emplName = ID + "EmplName",
  pw = ID + "Pw",
  pwCheck = ID + "PwCheck",
}

interface CreEmplModalProps {
  session: Session;
}

export default function CreEmplModal({ onClose, session }: ModalProps<CreEmplModalProps>) {
  const pwRef = useRef<HTMLInputElement>(null);
  const pwCheckRef = useRef<HTMLInputElement>(null);
  const [validationPw, setValidationPw] = useState(true);

  const actions = useSetEmplStore();
  const modalStore = useSetModalStore();

  const mutation = useMutation({
    mutationKey: ["TBW_000010_P01"],
    mutationFn: async (data: string[]) => {
      console.log("mutationFn");
      const TBW_000010_P01Res = await callTms<TBW_000010_P01>({
        session,
        svcId: "TBW_000010_P01",
        data,
      });
      const TBW_000010_P01Data = TBW_000010_P01Res.svcRspnData;
      if (TBW_000010_P01Data === null) {
        throw new Error("TBW_000010_P01Data is null");
      }
    },
    onSuccess: () => {
      toast.success("사원이 등록되었습니다.");
      actions.reset();
      onClose();
    },
  });

  const checkPw = () => {
    const pw = pwRef.current?.value;
    const pwCheck = pwCheckRef.current?.value;

    setValidationPw(() => pw === pwCheck);
  };

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      const emplName = e.target[CreEmplInput.emplName].value;
      const extnUserId = e.target[CreEmplInput.extnUserId].value;
      const pw = e.target[CreEmplInput.pw].value;

      if (pw === "") throw new Error("비밀번호를 입력해주세요.");
      mutation.mutate([session.user.corpCd, extnUserId.trim(), emplName.trim(), pw]);
    } catch (error) {
      if (error instanceof Error) {
        await modalStore.push(ErrorModal, { props: { error } });
      }
    }
  };

  return (
    <Modal id={ID} onClose={onClose}>
      <form onSubmit={handleSubmit} className={css.modalCenterContent}>
        <ModalCloseBtn onClose={onClose} />
        <div>
          <div className={css.modalHeader}>
            <h3 className={css.modalTitle}>사원등록</h3>
          </div>
          <div className={inputBox}>
            <label className={label} htmlFor={CreEmplInput.extnUserId}>
              사원 ID
            </label>
            <DefaultInput id={CreEmplInput.extnUserId} />
          </div>
          <div className={inputBox}>
            <label className={label} htmlFor={CreEmplInput.emplName}>
              신규 사원명
            </label>
            <DefaultInput id={CreEmplInput.emplName} />
          </div>
          <div className={inputBox}>
            <label className={label} htmlFor={CreEmplInput.pw}>
              신규 비밀번호
            </label>
            <DefaultInput
              id={CreEmplInput.pw}
              type={"password"}
              inputRef={pwRef}
              onChange={checkPw}
            />
          </div>
          <div className={inputBox}>
            <label className={label} htmlFor={CreEmplInput.pwCheck}>
              신규 비밀번호 확인
            </label>
            <DefaultInput
              id={CreEmplInput.pwCheck}
              type={"password"}
              inputRef={pwCheckRef}
              onChange={checkPw}
            />
            <div className={pwCheckBox}>{!validationPw ? "비밀번호가 일치하지 않습니다." : ""}</div>
          </div>
        </div>
        <div className={css.modalBtnBox}>
          <button
            className={modalDefaultBtn}
            type="submit"
            disabled={validationPw === false || mutation.isPending}
          >
            등록
          </button>
        </div>
      </form>
    </Modal>
  );
}
