import { ModalProps } from "@/app/_lib/modalStore";
import Modal from "./Modal";
import ModalCloseBtn from "./ModalCloseBtn";
import * as css from "./modal.css";
import { modalDefaultBtn } from "./modalBtn.css";

const ID = "errorModal";

interface ErrorModalProps {
  title?: string;
  error: Error;
}

export default function ErrorModal({
  title = "Message",
  onClose,
  error,
}: ModalProps<ErrorModalProps>) {
  return (
    <Modal id={ID} onClose={onClose}>
      <div className={css.modalCenterContent}>
        <ModalCloseBtn onClose={onClose} />
        <div>
          <div className={css.modalHeader}>
            <h3 className={css.modalTitle}>{title}</h3>
          </div>
          <p>{error.message}</p>
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
