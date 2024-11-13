import { ModalProps } from "@/stores/modal";
import css from "./Modal.module.scss";
import { Modal } from "@mantine/core";

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
    <Modal opened centered onClose={onClose} title={title}>
      <div>
        <p>{content}</p>
      </div>
      <div className={css.btnBox}>
        <button className={css.btn} type="button" onClick={onClose}>
          확인
        </button>
      </div>
    </Modal>
  );
}
