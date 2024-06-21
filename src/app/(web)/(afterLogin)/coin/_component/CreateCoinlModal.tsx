import DefaultInput from "@/app/_component/input/DefaultInput";
import Modal from "@/app/_component/modal/Modal";
import ModalCloseBtn from "@/app/_component/modal/ModalCloseBtn";
import * as style from "@/app/_component/modal/modal.css";
import { modalDefaultBtn } from "@/app/_component/modal/modalBtn.css";
import { ModalProps } from "@/app/_lib/modalStore";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { inputBox, label } from "./createCoinModal.css";
import { addComma, deleteIntegerZero, replaceToNumber } from "@/app/_lib/regexp";

const ID = "createCoinModal";

enum CreateCoinInput {
  amount = ID + "Amount",
  otp = ID + "Otp",
}

interface CreateCoinModalProps {}

export default function CreateCoinModal({ onClose, onSuccess }: ModalProps<CreateCoinModalProps>) {
  const [amount, setAmount] = useState("");
  const [otp, setOtp] = useState("");

  const mutation = useMutation({
    mutationKey: ["서비스 아이디"],
    mutationFn: async () => {
      console.table({ emplName: amount.trim(), otp });
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
      case CreateCoinInput.amount:
        const integerStr = deleteIntegerZero(replaceToNumber(value));
        if (integerStr.length > 20) return; // 최대 20자리
        setAmount(() => addComma(integerStr));
        break;
      case CreateCoinInput.otp:
        const numberStr = replaceToNumber(value);
        if (numberStr.length > 6) return; // 최대 6자리
        setOtp(() => numberStr);
        break;
    }
  };

  return (
    <Modal id={ID} onClose={onClose}>
      <form onSubmit={handleSubmit} className={style.modalCenterContent} style={{ width: 450 }}>
        <ModalCloseBtn onClose={onClose} />
        <div>
          <div className={style.modalHeader}>
            <h3 className={style.modalTitle}>사원등록</h3>
          </div>
          <div className={inputBox}>
            <label className={label} htmlFor={CreateCoinInput.amount}>
              추가발행수량
            </label>
            <DefaultInput
              id={CreateCoinInput.amount}
              value={amount}
              onChange={onChangeInput}
              onReset={() => setAmount("")}
            />
          </div>
          <div className={inputBox}>
            <label className={label} htmlFor={CreateCoinInput.otp}>
              OTP
            </label>
            <DefaultInput
              id={CreateCoinInput.otp}
              value={otp}
              onChange={onChangeInput}
              onReset={() => setOtp("")}
            />
          </div>
        </div>
        <div className={style.modalBtnBox}>
          <button className={modalDefaultBtn} type="submit" disabled={mutation.isPending}>
            등록
          </button>
        </div>
      </form>
    </Modal>
  );
}
