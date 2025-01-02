import { ModalProps } from "@/stores/modal";
import { Button, LoadingOverlay, TextInput } from "@mantine/core";
import Modal from "@/components/common/modal/Modal";
import css from "@/components/common/modal/Modal.module.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Session } from "next-auth";
import { toast } from "sonner";
import EyeToggleBtn from "../common/btn/EyeToggleBtn";
import callTms from "@/libraries/callTms";

type Prop = {
  session: Session;
};

const ALERT_MODAL_ID = "deployPostModal";

export default function PostModal({ session, onClose, onSuccess }: ModalProps<Prop>) {
  const [instCd, setInstCd] = useState("");
  const [amount, setAmount] = useState("");
  const [pw, setPw] = useState("");
  const [isHidePw, setIsHidePw] = useState(true);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (arg: { corpCd: string; instCd: string; amount: string; pw: string }) => {
      const TBW_100501_P01Res = await callTms({
        session,
        svcId: "TBW_100501_P01",
        data: [arg.corpCd, arg.instCd, arg.amount, arg.pw],
      });

      const data = TBW_100501_P01Res?.svcRspnData;

      if (!data) {
        throw new Error("FCM999");
      }

      return data[0].F01;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["TBW_100501_Q01"] });
      toast.success("입고 발행이 완료되었습니다.");
      onSuccess(true);
    },
  });

  const toggleHide = () => {
    setIsHidePw((prev) => !prev);
  };

  const onSubmit = () => {
    if (mutation.isPending) return;

    mutation.mutate({
      corpCd: session.user.corpCd,
      instCd,
      amount,
      pw,
    });
  };

  return (
    <Modal id={ALERT_MODAL_ID} title={"입고 발행"} onClose={onClose} closeOnClickOutside={false}>
      <div className={css.content}>
        <TextInput
          variant="outline"
          label="종목"
          value={instCd}
          onChange={(e) => setInstCd(() => e.target.value)}
        />
        <TextInput
          mt={24}
          variant="outline"
          label="수량"
          value={amount}
          onChange={(e) => setAmount(() => e.target.value)}
        />
        <TextInput
          mt={24}
          variant="outline"
          label="비밀번호"
          type={isHidePw ? "password" : "text"}
          onChange={(e) => setPw(() => e.target.value)}
          rightSection={<EyeToggleBtn value={isHidePw} onClick={toggleHide} />}
        />
      </div>
      <div className={css.btnBox}>
        <Button variant="filled" onClick={onSubmit} disabled={mutation.isPending}>
          발행
        </Button>
      </div>
      <LoadingOverlay visible={mutation.isPending} overlayProps={{ radius: "sm", blur: 2 }} />
    </Modal>
  );
}
