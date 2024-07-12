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

  const onClickCopy = () => {
    window.navigator.clipboard.writeText(`사용자 ID : ${id}\n패스워드 : ${password}`);
    toast.success("클립보드에 복사 되었습니다.");
    setIsCheck(true);
  };

  return (
    <Modal id={ID}>
      <div className={modalCenterContent} style={{ width: 400 }}>
        <div>
          <div className={modalHeader}>
            <h3 className={modalTitle}>회사 생성</h3>
          </div>
          <div className={modalContent}>
            <div className={textBox}>
              <p>{`사용자 ID : ${id}`}</p>
            </div>
            <div className={textBox}>
              <p>{`패스워드  : ${password}`}</p>
            </div>
            <div className={descBox}>
              <p className="essential">사용자 아이디와 패스워드를 잃어버리지 마세요.</p>
            </div>
          </div>
        </div>
        <div className={modalBtnBox}>
          <button className={modalDefaultBtn} type="button" onClick={onClose} disabled={!isCheck}>
            확인
          </button>
          <button className={modalSaveBtn} type="button" onClick={onClickCopy}>
            복사
          </button>
        </div>
      </div>
    </Modal>
  );
}
