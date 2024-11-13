import css from "@/components/common/modal/Modal.module.scss";
import { RowData } from "@/constants/b2c/row.type";
import { ModalProps } from "@/stores/modal";
import { Modal } from "@mantine/core";
import { Session } from "next-auth";
import ApproveBtn from "./ApproveBtn";
import ApproveView from "./ApproveView";
import DenyBtn from "./DenyBtn";

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
