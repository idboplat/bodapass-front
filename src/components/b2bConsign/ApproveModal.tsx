import css from "@/components/common/modal/Modal.module.scss";
import { ModalProps } from "@/stores/modal";
import { Session } from "next-auth";
import { RowData } from "@/constants/b2bConsign/row.type";
import ApproveBtn from "./ApproveBtn";
import ApproveView from "./ApproveView";
import DenyBtn from "./DenyBtn";
import { Modal } from "@mantine/core";

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
