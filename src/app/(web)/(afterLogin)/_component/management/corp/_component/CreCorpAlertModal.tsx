import Modal from "@/app/_component/modal/Modal";
import { ModalProps } from "@/app/_lib/modalStore";
import {
  modalBtnBox,
  modalCenterContent,
  modalHeader,
  modalTitle,
  modalContent,
} from "@/app/_component/modal/modal.css";
import { modalDefaultBtn } from "@/app/_component/modal/modalBtn.css";
import CopyButton from "@/app/_component/btn/CopyBtn";
import { descBox, textBox } from "./creCorpAlertModal.css";
import { useState } from "react";

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
  const [isCheckId, setIsCheckId] = useState(false);
  const [isCheckPw, setIsCheckPw] = useState(false);

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
              <CopyButton
                size={20}
                text={id}
                onClick={() => setIsCheckId(true)}
                check={isCheckId}
              />
            </div>
            <div className={textBox}>
              <p>{`패스워드  : ${password}`}</p>
              <CopyButton
                size={20}
                text={id}
                onClick={() => setIsCheckPw(true)}
                check={isCheckPw}
              />
            </div>
            <div className={descBox}>
              <p className="essential">사용자 아이디와 패스워드를 복사하여 저장해주세요.</p>
            </div>
          </div>
        </div>
        <div className={modalBtnBox}>
          <button
            className={modalDefaultBtn}
            type="button"
            onClick={onClose}
            disabled={!isCheckId || !isCheckPw}
          >
            확인
          </button>
        </div>
      </div>
    </Modal>
  );
}
