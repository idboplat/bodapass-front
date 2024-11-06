import DefaultInput from "@/app/_component/input/DefaultInput";
import Modal from "@/app/_component/modal/Modal";
import ModalCloseBtn from "@/app/_component/modal/ModalCloseBtn";
import module from "@/app/_component/modal/Modal.module.scss";
import { ModalProps } from "@/app/_lib/modalStore";
import { addComma, deleteIntegerZero, replaceToNumber } from "@/app/_lib/regexp";
import callTms from "@/model/callTms";
import { TBW_000100_P01 } from "@/type/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Session } from "next-auth";
import { useState } from "react";
import { toast } from "sonner";
import { useSetTransactionCorpStore } from "../_lib/store";
import classNames from "classnames";

const ID = "reqModal";

enum ReqModalInput {
  instCd = ID + "InstCd",
  amount = ID + "Amount",
}

interface ReqModalProps {
  session: Session;
}

export default function ReqModal({ onClose, onSuccess, session }: ModalProps<ReqModalProps>) {
  const [instCd, setInstCd] = useState("USDL");
  const [amount, setAmount] = useState("");

  const actions = useSetTransactionCorpStore();
  const queryClient = useQueryClient();

  const muation = useMutation({
    mutationKey: ["TBW_000100_P01"],
    mutationFn: async ({ instCd, amount }: { instCd: string; amount: string }) => {
      if (!amount || amount === "0") throw new Error("신청할 USDL 수량을 입력해주세요.");
      if (!instCd) throw new Error("종목 코드를 입력해주세요.");
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
      toast.success("USDL 신청이 완료되었습니다.");
      // 입금 신청 내역 재조회
      queryClient.invalidateQueries({ queryKey: ["TBW_001000_Q03"] });
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
      <div className={classNames(module.content, "center")}>
        <ModalCloseBtn onClose={onClose} />
        <div>
          <div className={module.header}>
            <h3 className={module.title}>USDL 신청</h3>
          </div>
          <div>
            <div className={module.inputBox}>
              <label htmlFor={ReqModalInput.instCd} className={module.label}>
                종목 코드
              </label>
              <DefaultInput
                id={ReqModalInput.instCd}
                value={instCd}
                disabled={true}
                // placeholder="USDT"
                // onChange={onChangeInput}
                // onReset={() => setInstCd("")}
              />
            </div>
            <div className={module.inputBox}>
              <label htmlFor={ReqModalInput.amount} className={module.label}>
                신청 수량
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
        <div className={module.btnBox}>
          <button
            className={module.btn}
            type="button"
            onClick={() => muation.mutate({ amount, instCd })}
            disabled={muation.isPending}
          >
            신청
          </button>
        </div>
      </div>
    </Modal>
  );
}
