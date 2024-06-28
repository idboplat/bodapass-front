import Modal from "@/app/_component/modal/Modal";
import ModalCloseBtn from "@/app/_component/modal/ModalCloseBtn";
import * as css from "@/app/_component/modal/modal.css";
import { modalDenyBtn } from "@/app/_component/modal/modalBtn.css";
import { ModalProps } from "@/app/_lib/modalStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { RowData } from "../_const/row";

const ID = "cancelModal";

interface CancelModalProps {
  data: RowData;
  index: number;
}

export default function CancelModal({
  data,
  index,
  onClose,
  onSuccess,
}: ModalProps<CancelModalProps>) {
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
      <div className={css.modalCenterContent}>
        <ModalCloseBtn onClose={onClose} />
        <div>
          <div className={css.modalHeader}>
            <h3 className={css.modalTitle}>취소요청</h3>
          </div>
          <p>취소</p>
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
