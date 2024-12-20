import { ModalProps } from "@/stores/modal";
import Modal from "./Modal";
import css from "./Modal.module.scss";
import classNames from "classnames";

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
      <div className={classNames(css.content, css.center)}>
        <div>
          <div className={css.header}>
            <h3 className={css.title}>{title}</h3>
          </div>
          <p>{content}</p>
        </div>
        <div className={css.btnBox}>
          <button className={css.btn} type="button" onClick={onClose}>
            확인
          </button>
        </div>
      </div>
    </Modal>
  );
}
