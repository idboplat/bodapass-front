import { ModalProps } from "@/stores/modal";
import { Button } from "@mantine/core";
import Modal from "./Modal";
import css from "./Modal.module.scss";

type ConfirmModalProp = {
  title?: string;
  message: string;
};

const CONFIRM_MODAL_ID = "confirmModal";

export default function ConfirmModal({
  title = "Confirm",
  message,
  onClose,
  onSuccess,
}: ModalProps<ConfirmModalProp>) {
  return (
    <Modal id={CONFIRM_MODAL_ID} title={title} onClose={onClose} closeOnClickOutside={false}>
      <div className={css.content}>{message}</div>
      <div className={css.btnBox}>
        <Button variant="outline" onClick={onClose}>
          취소
        </Button>
        <Button variant="filled" onClick={() => onSuccess(true)}>
          확인
        </Button>
      </div>
    </Modal>
  );
}
