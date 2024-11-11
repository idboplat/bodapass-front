import css from "@/components/commmon/modal/Modal.module.scss";
import Modal from "@/components/common/modal/Modal";
import ModalCloseBtn from "@/components/common/modal/ModalCloseBtn";
import { RowData } from "@/constants/b2b/row.type";
import { ModalProps } from "@/stores/modal";
import classNames from "classnames";
import { Session } from "next-auth";
import ApproveBtn from "./ApproveBtn";
import ApproveView from "./ApproveView";
import DenyBtn from "./DenyBtn";

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
      <div className={classNames(css.content, "center")}>
        <ModalCloseBtn onClose={onClose} />
        <div>
          <div className={css.header}>
            <h3 className={css.title}>요청승인</h3>
          </div>
          <ApproveView data={data} />
        </div>
        <div className={css.btnBox}>
          <DenyBtn session={session} data={data} onSuccess={onSuccess} />
          <ApproveBtn session={session} data={data} onSuccess={onSuccess} />
        </div>
      </div>
    </Modal>
  );
}
