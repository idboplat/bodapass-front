import DefaultInput from "@/app/_component/input/DefaultInput";
import Modal from "@/app/_component/modal/Modal";
import ModalCloseBtn from "@/app/_component/modal/ModalCloseBtn";
import * as css from "@/app/_component/modal/modal.css";
import { modalDefaultBtn } from "@/app/_component/modal/modalBtn.css";
import { ModalProps } from "@/app/_lib/modalStore";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { inputBox, label } from "./creCoinModal.css";
import { addComma, deleteIntegerZero, replaceToNumber } from "@/app/_lib/regexp";
import { TBW_000300_P01 } from "@/type/api";
import callTms from "@/model/callTms";
import { Session } from "next-auth";
import { toast } from "sonner";
import { useSetCoinStore } from "../_lib/store";

const ID = "creCoinModal";

enum CreCoinInput {
  instCd = ID + "InstCd",
  amount = ID + "Amount",
  otp = ID + "Otp",
}

interface CreCoinModalProps {
  session: Session;
}

export default function CreCoinModal({
  onClose,
  onSuccess,
  session,
}: ModalProps<CreCoinModalProps>) {
  const [instCd, setInstCd] = useState("");
  const [amount, setAmount] = useState("");
  // const [otp, setOtp] = useState("");

  const actions = useSetCoinStore();

  const mutation = useMutation({
    mutationKey: ["TBW_000300_P01"],
    mutationFn: async () => {
      const TBW_000300_P01Res = await callTms<TBW_000300_P01>({
        session,
        svcId: "TBW_000300_P01",
        data: [session.user.corpCd, instCd, amount.replaceAll(",", "")],
      });
      const TBW_000300_P01Data = TBW_000300_P01Res.svcRspnData;
      if (TBW_000300_P01Data === null) {
        throw new Error("TBW_000300_P01Data is null");
      }
    },
    onSuccess: () => {
      toast.success("코인이 발행되었습니다.");
      actions.reset();
      onSuccess(true);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      mutation.mutate();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    switch (id) {
      case CreCoinInput.instCd:
        setInstCd(() => value);
        break;
      case CreCoinInput.amount:
        const integerStr = deleteIntegerZero(replaceToNumber(value));
        if (integerStr.length > 20) return; // 최대 20자리
        setAmount(() => addComma(integerStr));
        break;
    }
  };

  return (
    <Modal id={ID} onClose={onClose}>
      <form onSubmit={handleSubmit} className={css.modalCenterContent} style={{ width: 450 }}>
        <ModalCloseBtn onClose={onClose} />
        <div>
          <div className={css.modalHeader}>
            <h3 className={css.modalTitle}>코인 추가발행</h3>
          </div>
          <div className={inputBox}>
            <label className={label} htmlFor={CreCoinInput.instCd}>
              종목 코드
            </label>
            <DefaultInput
              id={CreCoinInput.instCd}
              value={instCd}
              onChange={onChangeInput}
              onReset={() => setInstCd("")}
            />
          </div>
          <div className={inputBox}>
            <label className={label} htmlFor={CreCoinInput.amount}>
              입출고 수량
            </label>
            <DefaultInput
              id={CreCoinInput.amount}
              value={amount}
              onChange={onChangeInput}
              onReset={() => setAmount("")}
            />
          </div>
          {/* <div className={inputBox}>
            <label className={label} htmlFor={CreCoinInput.otp}>
              OTP
            </label>
            <DefaultInput
              id={CreCoinInput.otp}
              value={otp}
              onChange={onChangeInput}
              onReset={() => setOtp("")}
            />
          </div> */}
        </div>
        <div className={css.modalBtnBox}>
          <button className={modalDefaultBtn} type="submit" disabled={mutation.isPending}>
            등록
          </button>
        </div>
      </form>
    </Modal>
  );
}
