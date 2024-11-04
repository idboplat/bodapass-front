import { ModalProps } from "@/app/_lib/modalStore";
import Modal from "./Modal";
import module from "./Modal.module.scss";
import { modalCancelBtn, modalDefaultBtn } from "./modalBtn.css";
import classNames from "classnames";

const ID = "confirmModal";

interface ConfirmModalProps {
  title?: string;
  content: React.ReactNode;
}

export default function ConfirmModal({
  title = "Confirm",
  content,
  onClose,
  onSuccess,
}: ModalProps<ConfirmModalProps>) {
  return (
    <Modal id={ID} onClose={onClose}>
      <div className={classNames(module.content, "center")}>
        <div>
          <div className={module.header}>
            <h3 className={module.title}>{title}</h3>
          </div>
          <p>{content}</p>
        </div>
        <div className={module.btnBox}>
          <button className={modalCancelBtn} type="button" onClick={onClose}>
            취소
          </button>
          <button className={modalDefaultBtn} type="button" onClick={() => onSuccess(true)}>
            확인
          </button>
        </div>
      </div>
    </Modal>
  );
}
