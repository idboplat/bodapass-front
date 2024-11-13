import DefaultInput from "@/components/common/input/DefaultInput";
import css from "@/components/common/modal/Modal.module.scss";
import callTms from "@/libraries/callTms";
import { useSetCoinStore } from "@/stores/deploy";
import { ModalProps } from "@/stores/modal";
import { TBW_000300_P01 } from "@/types/api";
import { addComma, deleteIntegerZero, replaceToNumber } from "@/utils/regexp";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Session } from "next-auth";
import { useState } from "react";
import { toast } from "sonner";
import creCoinModalCss from "./CreCoinModal.module.scss";
import { Modal } from "@mantine/core";

const ID = "creCoinModal";

enum CreCoinInput {
  instCd = ID + "InstCd",
  amount = ID + "Amount",
  adminPw = ID + "AdminPw",
}

interface CreCoinModalProps {
  session: Session;
}

export default function CreCoinModal({
  onClose,
  onSuccess,
  session,
}: ModalProps<CreCoinModalProps>) {
  const [amount, setAmount] = useState("");
  const queryClient = useQueryClient();

  const actions = useSetCoinStore();

  const mutation = useMutation({
    mutationKey: ["TBW_000300_P01"],
    mutationFn: async (arg: { amount: string; adminPw: string }) => {
      if (!arg.amount || arg.amount === "0") throw new Error("발행할 USDL 수량을 입력해주세요.");
      if (!arg.adminPw) throw new Error("관리자 Password를 입력해주세요.");
      const TBW_000300_P01Res = await callTms<TBW_000300_P01>({
        session,
        svcId: "TBW_000300_P01",
        data: [session.user.corpCd, "USDL", arg.amount.replaceAll(",", ""), arg.adminPw],
      });
      const TBW_000300_P01Data = TBW_000300_P01Res.svcRspnData;
      if (TBW_000300_P01Data === null) {
        throw new Error("TBW_000300_P01Data is null");
      }
    },
    onSuccess: () => {
      toast.success("USDL이 발행되었습니다.");
      actions.refreshPage();
      onSuccess(true);
      // 잔고 재조회
      queryClient.invalidateQueries({ queryKey: ["TBW_002000_S02"] });
    },
  });

  const handleSubmit = (e: any) => {
    try {
      e.preventDefault();
      const amount = e.target?.[CreCoinInput.amount]?.value;
      const adminPw = e.target?.[CreCoinInput.adminPw]?.value;
      mutation.mutate({ amount, adminPw });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    switch (id) {
      case CreCoinInput.amount:
        const integerStr = deleteIntegerZero(replaceToNumber(value));
        if (integerStr.length > 20) return; // 최대 20자리
        setAmount(() => addComma(integerStr));
        break;
    }
  };

  return (
    <Modal opened centered onClose={onClose} title="USDL 발행" w={450}>
      <form onSubmit={handleSubmit} style={{ width: 450 }}>
        <div className={creCoinModalCss.inputBox}>
          <label className={creCoinModalCss.label} htmlFor={CreCoinInput.instCd}>
            종목 코드
          </label>
          <DefaultInput id={CreCoinInput.instCd} value={"USDL"} onChange={onChangeInput} disabled />
        </div>
        <div className={creCoinModalCss.inputBox}>
          <label className={creCoinModalCss.label} htmlFor={CreCoinInput.amount}>
            신규 발행할 USDL 수량 입력
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
        <div className={creCoinModalCss.inputBox}>
          <label className={creCoinModalCss.label} htmlFor={CreCoinInput.adminPw}>
            관리자 Password
          </label>
          <DefaultInput id={CreCoinInput.adminPw} onChange={onChangeInput} type="password" />
        </div>

        <div className={css.btnBox}>
          <button className={css.btn} type="submit" disabled={mutation.isPending}>
            발행
          </button>
        </div>
      </form>
    </Modal>
  );
}
