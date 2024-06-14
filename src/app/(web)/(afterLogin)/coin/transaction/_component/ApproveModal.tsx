import Modal from "@/app/_component/modal/Modal";
import * as style from "@/app/_component/modal/modal.css";
import { modalCancelBtn, modalDefaultBtn } from "@/app/_component/modal/modalBtn.css";
import { ModalProps } from "@/app/_lib/modalStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { RowData } from "../_const/colum";

const ID = "approveModal";

interface ApproveModalProps {
  data: RowData;
  index: number;
}

export default function ApproveModal({
  data,
  index,
  onClose,
  onSuccess,
}: ModalProps<ApproveModalProps>) {
  const queryClient = useQueryClient();

  const muation = useMutation({
    mutationKey: ["서비스아이디"],
    mutationFn: async () => {},
    onSuccess: () => {
      queryClient.setQueryData<RowData[]>(["조회서비스 아이디"], (prev) => {
        if (!prev) return prev;
        const arr = [...prev];
        //TODO: 단건조회해서 index 상태변경
        arr[index];
        return arr;
      });
      toast.success("성공");
      onSuccess(true);
    },
  });

  return (
    <Modal id={ID} onClose={onClose}>
      <div className={style.modalCenterContent}>
        <div>
          <div className={style.modalHeader}>
            <h3 className={style.modalTitle}>요청승인</h3>
          </div>
          <p>승인 또는 거절</p>
        </div>
        <div className={style.modalBtnBox}>
          <button
            className={modalCancelBtn}
            type="button"
            onClick={onClose}
            disabled={muation.isPending}
          >
            거절
          </button>
          <button
            className={modalDefaultBtn}
            type="button"
            onClick={() => muation.mutate()}
            disabled={muation.isPending}
          >
            승인
          </button>
        </div>
      </div>
    </Modal>
  );
}
