import DefaultInput from "@/app/_component/input/DefaultInput";
import Modal from "@/app/_component/modal/Modal";
import ModalCloseBtn from "@/app/_component/modal/ModalCloseBtn";
import * as css from "@/app/_component/modal/modal.css";
import { modalDefaultBtn, modalDenyBtn } from "@/app/_component/modal/modalBtn.css";
import { ModalProps } from "@/app/_lib/modalStore";
import { addComma, deleteIntegerZero, replaceToNumber } from "@/app/_lib/regexp";
import callTms from "@/model/callTms";
import { TBW_000100_P01 } from "@/type/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Session } from "next-auth";
import { useState } from "react";
import { toast } from "sonner";
import { useSetTransactionStore } from "../_lib/store";

const ID = "reqModal";

enum ReqModalInput {
  instCd = ID + "InstCd",
  amount = ID + "Amount",
}

interface ReqModalProps {
  session: Session;
}

export default function ReqModal({ onClose, onSuccess, session }: ModalProps<ReqModalProps>) {
  const [instCd, setInstCd] = useState("");
  const [amount, setAmount] = useState("");

  const actions = useSetTransactionStore();

  const muation = useMutation({
    mutationKey: ["TBW_000100_P01"],
    mutationFn: async () => {
      const TBW_000100_P01Res = await callTms<TBW_000100_P01>({
        session,
        svcId: "TBW_000100_P01",
        data: [session.user.corpCd, instCd, amount.replaceAll(",", "")],
      });
      const TBW_000100_P01Data = TBW_000100_P01Res.svcRspnData;
      if (TBW_000100_P01Data === null) {
        throw new Error("TBW_000100_P01Data is null");
      }
    },
    onSuccess: () => {
      toast.success("구매신청이 완료되었습니다.");
      actions.reset();
      onClose();
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
        setAmount(() => addComma(integerStr));
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
            <div className={css.inputBox}>
              <label htmlFor={ReqModalInput.instCd} className={css.label}>
                종목 코드
              </label>
              <DefaultInput
                id={ReqModalInput.instCd}
                value={instCd}
                placeholder="USDT"
                onChange={onChangeInput}
                onReset={() => setInstCd("")}
              />
            </div>
            <div className={css.inputBox}>
              <label htmlFor={ReqModalInput.amount} className={css.label}>
                입출고 수량
              </label>
              <DefaultInput
                id={ReqModalInput.amount}
                value={amount}
                onChange={onChangeInput}
                onReset={() => setAmount("")}
              />
            </div>
          </div>
        </div>
        <div className={css.modalBtnBox}>
          <button
            className={modalDefaultBtn}
            type="button"
            onClick={() => muation.mutate()}
            disabled={muation.isPending}
          >
            신청
          </button>
        </div>
      </div>
    </Modal>
  );
}
