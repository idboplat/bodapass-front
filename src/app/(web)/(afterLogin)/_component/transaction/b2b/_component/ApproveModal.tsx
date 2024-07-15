import Modal from "@/app/_component/modal/Modal";
import ModalCloseBtn from "@/app/_component/modal/ModalCloseBtn";
import { ModalProps } from "@/app/_lib/modalStore";
import { Session } from "next-auth";
import { RowData } from "../_const/row.type";
import ApproveBtn from "./ApproveBtn";
import ApproveView from "./ApproveView";
import DenyBtn from "./DenyBtn";
import * as css from "@/app/_component/modal/modal.css";

const ID = "approveModal";

interface ApproveModalProps {
  session: Session;
  data: RowData;
}

export default function ApproveModal({
  session,
  data,
  onClose,
  onSuccess,
}: ModalProps<ApproveModalProps>) {
  return (
    <Modal id={ID} onClose={onClose}>
      <div className={css.modalCenterContent}>
        <ModalCloseBtn onClose={onClose} />
        <div>
          <div className={css.modalHeader}>
            <h3 className={css.modalTitle}>요청승인</h3>
          </div>
          <ApproveView data={data} />
        </div>
        <div className={css.modalBtnBox}>
          <DenyBtn session={session} data={data} onSuccess={onSuccess} />
          <ApproveBtn session={session} data={data} onSuccess={onSuccess} />
        </div>
      </div>
    </Modal>
  );
}
