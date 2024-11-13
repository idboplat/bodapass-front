import { ModalProps } from "@/stores/modal";
import css from "./Modal.module.scss";
import classNames from "classnames";
import { Modal } from "@mantine/core";

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
    <Modal opened centered onClose={onClose} title={title}>
      <div>
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
    </Modal>
  );
}
