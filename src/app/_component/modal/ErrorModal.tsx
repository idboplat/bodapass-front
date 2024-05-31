import { ModalProps, useSetModalStore } from "@/app/_lib/modalStore";
import Modal from "./Modal";
import ModalCloseBtn from "./ModalCloseBtn";
import * as style from "./modal.css";
import { modalDefaultBtn } from "./modalBtn.css";
import Link from "next/link";
import ConfirmModal from "./ConfirmModal";

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
  const modalStore = useSetModalStore();
  return (
    <Modal id={ID} onClose={onClose}>
      <div className={style.modalCenterContent}>
        <ModalCloseBtn onClose={onClose} />
        <div>
          <div className={style.modalHeader}>
            <h3 className={style.modalTitle}>{title}</h3>
          </div>
          <p>{error.message}</p>
          <Link href="/preview2"> ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅁㄴㅇ</Link>
        </div>
        <div className={style.modalBtnBox}>
          <button className={modalDefaultBtn} type="button" onClick={onClose}>
            확인
          </button>
          <button
            className={modalDefaultBtn}
            type="button"
            onClick={() => modalStore.push(ConfirmModal, { props: { content: "취소 또는 확인" } })}
          >
            테스트
          </button>
        </div>
      </div>
    </Modal>
  );
}
