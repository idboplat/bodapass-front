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
  return (
    <Modal id={ID} onClose={onClose}>
      <div className={modalCenterContent} style={{ width: 400 }}>
        <div>
          <div className={modalHeader}>
            <h3 className={modalTitle}>회사 생성</h3>
          </div>
          <div className={modalContent}>
            <p>{`사용자 ID : ${id}`}</p>
            <p>{`패스워드  : ${password}`}</p>
          </div>
        </div>
        <div className={modalBtnBox}>
          <button className={modalDefaultBtn} type="button" onClick={onClose}>
            확인
          </button>
        </div>
      </div>
    </Modal>
  );
}
