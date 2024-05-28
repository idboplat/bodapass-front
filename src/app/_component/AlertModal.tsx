"use client";
import { ModalProps } from "@/model/modal/modalController";
import Modal from "./Modal";
import { ModalCenterContent } from "./Modal.style";

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
      <ModalCenterContent>
        <div>
          <h3>{title}</h3>
        </div>
        <div>
          <div>{content}</div>
          <div>
            <button onClick={onClose}>확인</button>
          </div>
        </div>
      </ModalCenterContent>
    </Modal>
  );
}
