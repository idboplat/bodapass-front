import { ModalProps } from "@/app/_lib/modalStore";
import Modal from "./Modal";
import module from "./Modal.module.scss";
import { modalDefaultBtn } from "./modalBtn.css";
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
      <div className={classNames(module.content, module.center)}>
        <div>
          <div className={module.header}>
            <h3 className={module.title}>{title}</h3>
          </div>
          <p>{content}</p>
        </div>
        <div className={module.btnBox}>
          <button className={modalDefaultBtn} type="button" onClick={onClose}>
            확인
          </button>
        </div>
      </div>
    </Modal>
  );
}
