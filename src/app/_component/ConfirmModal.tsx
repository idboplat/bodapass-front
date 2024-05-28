"use client";
import { ModalProps } from "@/model/modal/modalController";
import Modal from "./Modal";
import { ModalCenterContent } from "./Modal.style";

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
      <ModalCenterContent>
        <div>
          <h3>{title}</h3>
        </div>
        <div>
          <div>{content}</div>
          <div>
            <button onClick={onClose}>취소</button>
            <button onClick={() => onSuccess(true)}>확인</button>
          </div>
        </div>
      </ModalCenterContent>
    </Modal>
  );
}
