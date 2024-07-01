import Modal from "@/app/_component/modal/Modal";
import ModalCloseBtn from "@/app/_component/modal/ModalCloseBtn";
import { modalDenyBtn } from "@/app/_component/modal/modalBtn.css";
import { ModalProps } from "@/app/_lib/modalStore";
import callTms from "@/model/callTms";
import { TBW_000100_P02 } from "@/type/api";
import { useMutation } from "@tanstack/react-query";
import { Session } from "next-auth";
import { toast } from "sonner";
import { RowData } from "../_const/row";
import * as css from "@/app/_component/modal/modal.css";
import ApproveView from "./ApproveView";

const ID = "cancelModal";

interface CancelModalProps {
  session: Session;
  data: RowData;
}

export default function CancelModal({
  session,
  data,
  onClose,
  onSuccess,
}: ModalProps<CancelModalProps>) {
  const muation = useMutation({
    mutationKey: ["TBW_000100_P02"],
    mutationFn: async () => {
      const TBW_000100_P02Res = await callTms<TBW_000100_P02>({
        svcId: "TBW_000100_P02",
        session,
        data: [
          session.user.corpCd,
          data.일자, //입출고 일자
          data.일련번호, //입출고 일련번호
        ],
      });

      const TBW_000100_P02Data = TBW_000100_P02Res.svcRspnData;

      if (!TBW_000100_P02Data) {
        throw new Error("TBW_000100_P02Data is null");
      }

      return TBW_000100_P02Data[0].F01;
    },
    onSuccess: () => {
      toast.success("신청이 취소되었습니다.");
      onSuccess("cancel");
    },
  });

  return (
    <Modal id={ID} onClose={onClose}>
      <div className={css.modalCenterContent}>
        <ModalCloseBtn onClose={onClose} />
        <div>
          <div className={css.modalHeader}>
            <h3 className={css.modalTitle}>취소요청</h3>
          </div>
          <ApproveView data={data} />
        </div>
        <div className={css.modalBtnBox}>
          <button
            className={modalDenyBtn}
            type="button"
            onClick={onClose}
            disabled={muation.isPending}
          >
            취소
          </button>
        </div>
      </div>
    </Modal>
  );
}
