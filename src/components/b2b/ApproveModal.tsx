import css from "@/components/commmon/modal/Modal.module.scss";
import { RowData } from "@/constants/b2b/row.type";
import { ModalProps } from "@/stores/modal";
import { Session } from "next-auth";
import ApproveBtn from "./ApproveBtn";
import ApproveView from "./ApproveView";
import DenyBtn from "./DenyBtn";
import { Modal } from "@mantine/core";

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
    <Modal opened centered onClose={onClose} title="요청승인">
      <div>
        <ApproveView data={data} />
      </div>
      <div className={css.btnBox}>
        <DenyBtn session={session} data={data} onSuccess={onSuccess} />
        <ApproveBtn session={session} data={data} onSuccess={onSuccess} />
      </div>
    </Modal>
  );
}
