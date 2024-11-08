import { ModalProps } from "@/app/_lib/modalStore";
import Modal from "./Modal";
import css from "./Modal.module.scss";
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
      <div className={classNames(css.content, "center")}>
        <div>
          <div className={css.header}>
            <h3 className={css.title}>{title}</h3>
          </div>
          <p>{content}</p>
        </div>
        <div className={css.btnBox}>
          <button className={classNames(css.btn, "cancel")} type="button" onClick={onClose}>
            취소
          </button>
          <button className={css.btn} type="button" onClick={() => onSuccess(true)}>
            확인
          </button>
        </div>
      </div>
    </Modal>
  );
}
