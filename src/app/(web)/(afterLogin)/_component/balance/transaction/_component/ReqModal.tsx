import DefaultInput from "@/app/_component/input/DefaultInput";
import Modal from "@/app/_component/modal/Modal";
import ModalCloseBtn from "@/app/_component/modal/ModalCloseBtn";
import * as css from "@/app/_component/modal/modal.css";
import { modalDefaultBtn, modalDenyBtn } from "@/app/_component/modal/modalBtn.css";
import { ModalProps } from "@/app/_lib/modalStore";
import { addComma, deleteIntegerZero, replaceToNumber } from "@/app/_lib/regexp";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

const ID = "reqModal";

enum ReqModalInput {
  instCd = ID + "InstCd",
  amount = ID + "Amount",
}

interface ReqModalProps {}

export default function ReqModal({ onClose, onSuccess }: ModalProps<ReqModalProps>) {
  const [instCd, setInstCd] = useState("");
  const [amt, setAmt] = useState("");

  const queryClient = useQueryClient();

  const muation = useMutation({
    mutationKey: ["TBW_000100_P01"],
    mutationFn: async () => {},
    onSuccess: () => {
      toast.success("성공");
      onSuccess(true);
    },
  });

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    switch (id) {
      case ReqModalInput.instCd:
        setInstCd(() => value);
        break;
      case ReqModalInput.amount:
        const integerStr = deleteIntegerZero(replaceToNumber(value));
        if (integerStr.length > 20) return; // 최대 20자리
        setAmt(() => addComma(integerStr));
        break;
    }
  };

  return (
    <Modal id={ID} onClose={onClose}>
      <div className={css.modalCenterContent}>
        <ModalCloseBtn onClose={onClose} />
        <div>
          <div className={css.modalHeader}>
            <h3 className={css.modalTitle}>구매 신청</h3>
          </div>
          <div>
            <div>
              <label htmlFor={ReqModalInput.instCd}>종목 코드</label>
              <DefaultInput
                id={ReqModalInput.instCd}
                value={instCd}
                placeholder="USDT"
                onChange={onChangeInput}
              />
            </div>
            <div>
              <label htmlFor={ReqModalInput.amount}>입출고 수량</label>
              <DefaultInput value={amt} onChange={onChangeInput} />
            </div>
          </div>
        </div>
        <div className={css.modalBtnBox}>
          <button
            className={modalDenyBtn}
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
