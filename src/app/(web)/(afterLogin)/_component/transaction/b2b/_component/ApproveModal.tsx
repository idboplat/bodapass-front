import Modal from "@/app/_component/modal/Modal";
import ModalCloseBtn from "@/app/_component/modal/ModalCloseBtn";
import { ModalProps } from "@/app/_lib/modalStore";
import { Session } from "next-auth";
import { RowData } from "../_const/row.type";
import ApproveBtn from "./ApproveBtn";
import ApproveView from "./ApproveView";
import DenyBtn from "./DenyBtn";
import module from "@/app/_component/modal/Modal.module.scss";
import classNames from "classnames";

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
      <div className={classNames(module.content, "center")}>
        <ModalCloseBtn onClose={onClose} />
        <div>
          <div className={module.header}>
            <h3 className={module.title}>요청승인</h3>
          </div>
          <ApproveView data={data} />
        </div>
        <div className={module.btnBox}>
          <DenyBtn session={session} data={data} onSuccess={onSuccess} />
          <ApproveBtn session={session} data={data} onSuccess={onSuccess} />
        </div>
      </div>
    </Modal>
  );
}
