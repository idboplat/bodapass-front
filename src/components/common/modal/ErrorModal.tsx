import { ModalProps } from "@/stores/modal";
import Modal from "./Modal";
import ModalCloseBtn from "./ModalCloseBtn";
import css from "./Modal.module.scss";
import classNames from "classnames";

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
      <div className={classNames(css.content, "center")}>
        <ModalCloseBtn onClose={onClose} />
        <div>
          <div className={css.header}>
            <h3 className={css.title}>{title}</h3>
          </div>
          <p>{error.message}</p>
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
