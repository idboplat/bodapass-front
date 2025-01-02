import { ModalProps } from "@/stores/modal";
import { Button } from "@mantine/core";
import Modal from "./Modal";
import css from "./Modal.module.scss";

type ErrorModalProp = {
  title?: string;
  error: Error;
};

const ERROR_MODAL_ID = "errorModal";

export default function ErrorModal({
  title = "Confirm",
  error,
  onClose,
}: ModalProps<ErrorModalProp>) {
  return (
    <Modal id={ERROR_MODAL_ID} title={title} onClose={onClose} closeOnClickOutside={false}>
      <div className={css.content}>{error.message}</div>
      <div className={css.btnBox}>
        <Button onClick={onClose}>확인</Button>
      </div>
    </Modal>
  );
}
