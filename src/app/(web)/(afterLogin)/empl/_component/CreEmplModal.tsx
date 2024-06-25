import DefaultInput from "@/app/_component/input/DefaultInput";
import Modal from "@/app/_component/modal/Modal";
import ModalCloseBtn from "@/app/_component/modal/ModalCloseBtn";
import { modalDefaultBtn } from "@/app/_component/modal/modalBtn.css";
import { ModalProps } from "@/app/_lib/modalStore";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { inputBox, label, pwCheckBox } from "./creEmplModal.css";
import * as style from "@/app/_component/modal/modal.css";
import callTms from "@/model/callTms";
import { Session } from "next-auth";
import { toast } from "sonner";
import { TBW_000001_P01 } from "@/type/api";
import { useSetEmplStore } from "../_lib/store";

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
  const [extnUserId, setExtnUserId] = useState("");
  const [emplName, setEmplName] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const isPwCheck = pw === pwCheck;
  const actions = useSetEmplStore();

  const mutation = useMutation({
    mutationKey: ["TBW_000010_P01"],
    mutationFn: async () => {
      console.log("mutationFn");
      const TBW_000010_P01Res = await callTms<TBW_000001_P01>({
        session,
        svcId: "TBW_000010_P01",
        data: [session.user.corpCd, extnUserId.trim(), emplName.trim(), pw.trim()],
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
  const handleSubmit = (e: any) => {
    const emplName = e.target[CreEmplInput.emplName].value;
    const pw = e.target[CreEmplInput.pw].value;
    const pwCheck = e.target[CreEmplInput.pwCheck].value;

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
      case CreEmplInput.extnUserId:
        setExtnUserId(() => value);
        break;
      case CreEmplInput.emplName:
        setEmplName(() => value);
        break;
      case CreEmplInput.pw:
        setPw(() => value);
        break;
      case CreEmplInput.pwCheck:
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
            <label className={label} htmlFor={CreEmplInput.extnUserId}>
              사원 ID
            </label>
            <DefaultInput id={CreEmplInput.extnUserId} onChange={onChangeInput} />
          </div>
          <div className={inputBox}>
            <label className={label} htmlFor={CreEmplInput.emplName}>
              신규 사원명
            </label>
            <DefaultInput id={CreEmplInput.emplName} onChange={onChangeInput} />
          </div>
          <div className={inputBox}>
            <label className={label} htmlFor={CreEmplInput.pw}>
              신규 비밀번호
            </label>
            <DefaultInput id={CreEmplInput.pw} onChange={onChangeInput} type={"password"} />
          </div>
          <div className={inputBox}>
            <label className={label} htmlFor={CreEmplInput.pwCheck}>
              신규 비밀번호 확인
            </label>
            <DefaultInput id={CreEmplInput.pwCheck} onChange={onChangeInput} type={"password"} />
            <div className={pwCheckBox}>
              {pw && !isPwCheck ? "비밀번호가 일치하지 않습니다." : ""}
            </div>
          </div>
        </div>
        <div className={style.modalBtnBox}>
          <button
            className={modalDefaultBtn}
            type="submit"
            disabled={mutation.isPending || !isPwCheck}
          >
            등록
          </button>
        </div>
      </form>
    </Modal>
  );
}
