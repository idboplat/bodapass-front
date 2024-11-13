import { ModalProps } from "@/stores/modal";
import { Modal } from "@mantine/core";
import css from "./Modal.module.scss";

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
    <Modal opened centered onClose={onClose} title={title}>
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
    </Modal>
  );
}
