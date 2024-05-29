"use client";
import ErrorModal from "@/app/_component/ErrorModal";
import Modal from "@/app/_component/Modal";
import { Header, ModalCenterContent, Title } from "@/app/_component/Modal.style";
import useModalStore from "@/hook/useModalStore";
import callTms from "@/model/callTms";
import { ModalProps } from "@/model/modal/modalController";
import {
  ButtonBox,
  Form,
  Input,
  InputBox,
  Label,
  List,
} from "@inner/(afterLogin)/user/_component/RegisterModal.style";
import { useMutation } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { Session } from "next-auth";
import { useState } from "react";
import { subscribeDetailsAtom } from "../../_lib/atom";
import { ModalButton } from "@/app/_component/Button.style";
import DotsLoading from "@/app/_component/DotsLoading";
import ModalCloseButton from "@/app/_component/ModalCloseButton";

const ID = "registerSubscriptionModal";

enum RegisterSubscrInput {
  userId = `${ID}UserId`,
  subscrStartDt = `${ID}SubscrStartDt`,
  subscrEndDt = `${ID}SubscrEndDt`,
}

interface RegisterSubscrModalProps {
  session: Session;
}

export default function RegisterSubscrModal({
  session,
  onClose,
}: ModalProps<RegisterSubscrModalProps>) {
  const [userId, setUserId] = useState("");
  const [subscrStartDt, setSubscrStartDt] = useState("");
  const [subscrEndDt, setSubscrEndDt] = useState("");
  const setSubscribeDetails = useSetAtom(subscribeDetailsAtom);

  const modalStore = useModalStore();

  const mutateRegisterSubscr = useMutation({
    mutationKey: ["registerSubscr"],
    mutationFn: async () => {
      const B9011ARes = await callTms({
        session,
        svcId: "B9011A",
        data: [
          session.user.sessionId,
          session.user.sessionKey,
          userId,
          subscrStartDt.replaceAll("-", ""),
          subscrEndDt.replaceAll("-", ""),
        ],
      });
      const B9011AData = B9011ARes.svcRspnData;
      if (B9011AData === null) {
        throw new Error("B9011AData is null");
      }
    },
    onSuccess: () => {
      setSubscribeDetails((pre) => ({
        ...pre,
        nonce: pre.nonce + 1,
      }));
      onClose();
    },
    onError: (error) => modalStore.push(ErrorModal, { props: { error } }),
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;

    switch (id) {
      case RegisterSubscrInput.userId:
        if (value.length < 9) {
          setUserId(() => value);
        }
        break;
      case RegisterSubscrInput.subscrStartDt:
        setSubscrStartDt(() => value);
        break;
      case RegisterSubscrInput.subscrEndDt:
        setSubscrEndDt(() => value);
        break;
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutateRegisterSubscr.mutate();
  };

  return (
    <Modal id={ID} onClose={onClose}>
      <ModalCenterContent>
        <ModalCloseButton onClose={onClose} />
        <Form onSubmit={onSubmit}>
          <Header>
            <Title>구독 접수내역 등록</Title>
          </Header>
          <List>
            <InputBox>
              <Label htmlFor={RegisterSubscrInput.userId}>사용자 ID</Label>
              <Input
                value={userId}
                onChange={onChange}
                id={RegisterSubscrInput.userId}
                type="text"
              />
            </InputBox>
            <InputBox>
              <Label htmlFor={RegisterSubscrInput.subscrStartDt}>구독시작일</Label>
              <Input
                value={subscrStartDt}
                onChange={onChange}
                id={RegisterSubscrInput.subscrStartDt}
                type="date"
              />
            </InputBox>
            <InputBox>
              <Label htmlFor={RegisterSubscrInput.subscrEndDt}>구독만료일</Label>
              <Input
                value={subscrEndDt}
                onChange={onChange}
                id={RegisterSubscrInput.subscrEndDt}
                type="date"
              />
            </InputBox>
          </List>
          <ButtonBox>
            <ModalButton type="submit" disabled={mutateRegisterSubscr.isPending}>
              {mutateRegisterSubscr.isPending ? <DotsLoading /> : "등록"}
            </ModalButton>
          </ButtonBox>
        </Form>
      </ModalCenterContent>
    </Modal>
  );
}
