import { ModalProps } from "@/app/_lib/modalStore";
import Modal from "./Modal";
import * as css from "./modal.css";
import { modalDefaultBtn } from "./modalBtn.css";

export const ID = "alertModal";

interface AlertModalProps {
  title?: string;
  content: React.ReactNode;
}

export default function AlertModal({
  title = "Alert",
  onClose,
  content,
}: ModalProps<AlertModalProps>) {
  return (
    <Modal id={ID} onClose={onClose}>
      <div className={css.modalCenterContent}>
        <div>
          <div className={css.modalHeader}>
            <h3 className={css.modalTitle}>{title}</h3>
          </div>
          <p>{content}</p>
        </div>
        <div className={css.modalBtnBox}>
          <button className={modalDefaultBtn} type="button" onClick={onClose}>
            확인
          </button>
        </div>
      </div>
    </Modal>
  );
}
