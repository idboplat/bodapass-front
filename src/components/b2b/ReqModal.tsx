import css from "@/components/common/modal/Modal.module.scss";
import DefaultInput from "@/components/common/input/DefaultInput";
import Modal from "@/components/common/modal/Modal";
import ModalCloseBtn from "@/components/common/modal/ModalCloseBtn";
import callTms from "@/libraries/callTms";
import { ModalProps } from "@/stores/modal";
import { TBW_000100_P01 } from "@/types/api";
import { addComma, deleteIntegerZero, replaceToNumber } from "@/utils/regexp";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { Session } from "next-auth";
import { useState } from "react";
import { toast } from "sonner";
import { useSetTransactionCorpStore } from "@/stores/b2b";

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
      <div className={classNames(css.content, "center")}>
        <ModalCloseBtn onClose={onClose} />
        <div>
          <div className={css.header}>
            <h3 className={css.title}>USDL 신청</h3>
          </div>
          <div>
            <div className={css.inputBox}>
              <label htmlFor={ReqModalInput.instCd} className={css.label}>
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
            <div className={css.inputBox}>
              <label htmlFor={ReqModalInput.amount} className={css.label}>
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
        <div className={css.btnBox}>
          <button
            className={css.btn}
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
