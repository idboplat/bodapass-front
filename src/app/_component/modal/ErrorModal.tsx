import { ModalProps } from "@/app/_lib/modalStore";
import Modal from "./Modal";
import ModalCloseBtn from "./ModalCloseBtn";
import module from "./Modal.module.scss";
import { modalDefaultBtn } from "./modalBtn.css";
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
      <div className={classNames(module.contnet, "center")}>
        <ModalCloseBtn onClose={onClose} />
        <div>
          <div className={module.header}>
            <h3 className={module.title}>{title}</h3>
          </div>
          <p>{error.message}</p>
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
