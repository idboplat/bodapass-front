import Modal from "@/app/_component/modal/Modal";
import { ModalProps } from "@/app/_lib/modalStore";
import {
  modalBtnBox,
  modalCenterContent,
  modalHeader,
  modalTitle,
  modalContent,
} from "@/app/_component/modal/modal.css";
import { modalDefaultBtn, modalSaveBtn } from "@/app/_component/modal/modalBtn.css";
import { descBox, textBox } from "./creCorpAlertModal.css";
import { useState } from "react";
import { toast } from "sonner";
import CopyButton from "@/app/_component/btn/CopyBtn";
import CheckBox from "@/app/_component/input/CheckBox";

const ID = "creCorpAlertModal";

interface CreCorpAlertModalProps {
  id: string;
  password: string;
}

export default function CreCorpAlertModal({
  id,
  password,
  onClose,
}: ModalProps<CreCorpAlertModalProps>) {
  const [isCheck, setIsCheck] = useState(false);

  return (
    <Modal id={ID}>
      <div className={modalCenterContent} style={{ width: 400 }}>
        <div>
          <div className={modalHeader}>
            <h3 className={modalTitle}>회사 생성</h3>
          </div>
          <div className={modalContent}>
            <div className={textBox}>
              <p>{`회사 ID : ${id}`}</p>
              <CopyButton text={id} />
            </div>
            <div className={textBox}>
              <p>{`패스워드  : ${password}`}</p>
              <CopyButton text={password} />
            </div>
            <div className={descBox}>
              <CheckBox value={isCheck} onClick={() => setIsCheck(() => !isCheck)} />
              <p>회사 ID와 패스워드를 확인하시고, G2 관리자에게 전달하시기 바랍니다.</p>
            </div>
          </div>
        </div>
        <div className={modalBtnBox}>
          <button className={modalDefaultBtn} type="button" onClick={onClose} disabled={!isCheck}>
            확인
          </button>
        </div>
      </div>
    </Modal>
  );
}
