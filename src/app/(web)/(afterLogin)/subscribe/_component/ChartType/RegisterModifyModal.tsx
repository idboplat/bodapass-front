"use client";
import { ModalButton } from "@/app/_component/Button.style";
import ErrorModal from "@/app/_component/ErrorModal";
import Modal from "@/app/_component/Modal";
import { Header, ModalCenterContent, Title } from "@/app/_component/Modal.style";
import useModalStore from "@/hook/useModalStore";
import callTms from "@/model/callTms";
import { ModalProps } from "@/model/modal/modalController";
import styled from "@emotion/styled";
import {
  ButtonBox,
  Form,
  Input,
  InputBox,
  Label,
  List,
} from "@/app/(web)/(afterLogin)/user/_component/RegisterModal.style";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { subscribeChartTypeAtom } from "../../_lib/atom";
import ModalCloseButton from "@/app/_component/ModalCloseButton";
import DotsLoading from "@/app/_component/DotsLoading";

const CheckBoxWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 7px;
`;

const ButtonBoxMod = styled(ButtonBox)`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const ID = "registerSubscriptionModal";

enum RegisterModifyModalInput {
  userId = `${ID}UserId`,
  subscrSn = `${ID}SubscrSn`,
  chart1SubscrYn = `${ID}Chart1SubscrYn`,
  chart2SubscrYn = `${ID}Chart2SubscrYn`,
  chart3SubscrYn = `${ID}Chart3SubscrYn`,
  chart4SubscrYn = `${ID}Chart4SubscrYn`,
  chart5SubscrYn = `${ID}Chart5SubscrYn`,
}

interface RegisterModifyModalModalProps {
  session: Session;
}

export default function RegisterModifyModal({
  session,
  onClose,
}: ModalProps<RegisterModifyModalModalProps>) {
  const [userId, setUserId] = useState("");
  const [subscrSn, setSubscrSn] = useState("");
  const [chart1SubscrYn, setChart1SubscrYn] = useState(false);
  const [chart2SubscrYn, setChart2SubscrYn] = useState(false);
  const [chart3SubscrYn, setChart3SubscrYn] = useState(false);
  const [chart4SubscrYn, setChart4SubscrYn] = useState(false);
  const [chart5SubscrYn, setChart5SubscrYn] = useState(false);

  const [chartType, setChartType] = useAtom(subscribeChartTypeAtom);

  const modalStore = useModalStore();

  const mutateRegisterModifyModal = useMutation({
    mutationKey: ["B9012A"],
    mutationFn: async () => {
      const B9012ARes = await callTms({
        session,
        svcId: "B9012A",
        data: [
          session.user.sessionId,
          session.user.sessionKey,
          userId,
          subscrSn,
          chart1SubscrYn === true ? "Y" : "N",
          chart2SubscrYn === true ? "Y" : "N",
          chart3SubscrYn === true ? "Y" : "N",
          chart4SubscrYn === true ? "Y" : "N",
          chart5SubscrYn === true ? "Y" : "N",
        ],
      });
      const B9012AData = B9012ARes.svcRspnData;
      if (B9012AData === null) {
        throw new Error("B9012AData is null");
      }
    },
    onSuccess: () => {
      setChartType((pre) => ({ ...pre, nonce: pre.nonce + 1 }));
      onClose();
    },
    onError: (error) => modalStore.push(ErrorModal, { props: { error } }),
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;

    switch (id) {
      case RegisterModifyModalInput.userId:
        setUserId(() => value);
        break;
      case RegisterModifyModalInput.subscrSn:
        setSubscrSn(() => value);
        break;
      case RegisterModifyModalInput.chart1SubscrYn:
        setChart1SubscrYn((prev) => !prev);
        break;
      case RegisterModifyModalInput.chart2SubscrYn:
        setChart2SubscrYn((prev) => !prev);
        break;
      case RegisterModifyModalInput.chart3SubscrYn:
        setChart3SubscrYn((prev) => !prev);
        break;
      case RegisterModifyModalInput.chart4SubscrYn:
        setChart4SubscrYn((prev) => !prev);
        break;
      case RegisterModifyModalInput.chart5SubscrYn:
        setChart5SubscrYn((prev) => !prev);
        break;
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutateRegisterModifyModal.mutate();
  };

  useEffect(() => {
    setUserId(() => chartType.userId);
    setSubscrSn(() => chartType.subscrSn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal id={ID} onClose={onClose}>
      <ModalCenterContent>
        <ModalCloseButton onClose={onClose} />
        <Form onSubmit={onSubmit}>
          <Header>
            <Title>구독 차트유형 등록/수정</Title>
          </Header>
          <List>
            <InputBox>
              <Label htmlFor={RegisterModifyModalInput.userId}>사용자 ID</Label>
              <Input
                value={userId}
                onChange={onChange}
                id={RegisterModifyModalInput.userId}
                type="text"
                disabled
              />
            </InputBox>
            <InputBox>
              <Label htmlFor={RegisterModifyModalInput.subscrSn}>구독 일련번호</Label>
              <Input
                value={subscrSn}
                onChange={onChange}
                id={RegisterModifyModalInput.subscrSn}
                type="text"
                disabled
              />
            </InputBox>
            <CheckBoxWrap>
              <Label htmlFor={RegisterModifyModalInput.chart1SubscrYn}>차트_1 구독 여부</Label>
              <Input
                checked={chart1SubscrYn}
                onChange={onChange}
                id={RegisterModifyModalInput.chart1SubscrYn}
                type="checkbox"
              />
            </CheckBoxWrap>
            <CheckBoxWrap>
              <Label htmlFor={RegisterModifyModalInput.chart2SubscrYn}>차트_2 구독 여부</Label>
              <Input
                checked={chart2SubscrYn}
                onChange={onChange}
                id={RegisterModifyModalInput.chart2SubscrYn}
                type="checkbox"
              />
            </CheckBoxWrap>
            <CheckBoxWrap>
              <Label htmlFor={RegisterModifyModalInput.chart3SubscrYn}>차트_3 구독 여부</Label>
              <Input
                checked={chart3SubscrYn}
                onChange={onChange}
                id={RegisterModifyModalInput.chart3SubscrYn}
                type="checkbox"
              />
            </CheckBoxWrap>
            <CheckBoxWrap>
              <Label htmlFor={RegisterModifyModalInput.chart4SubscrYn}>차트_4 구독 여부</Label>
              <Input
                checked={chart4SubscrYn}
                onChange={onChange}
                id={RegisterModifyModalInput.chart4SubscrYn}
                type="checkbox"
              />
            </CheckBoxWrap>
            <CheckBoxWrap>
              <Label htmlFor={RegisterModifyModalInput.chart5SubscrYn}>차트_5 구독 여부</Label>
              <Input
                checked={chart5SubscrYn}
                onChange={onChange}
                id={RegisterModifyModalInput.chart5SubscrYn}
                type="checkbox"
              />
            </CheckBoxWrap>
          </List>
          <ButtonBoxMod>
            <ModalButton type="submit" disabled={mutateRegisterModifyModal.isPending}>
              {mutateRegisterModifyModal.isPending ? <DotsLoading /> : "등록/수정"}
            </ModalButton>
          </ButtonBoxMod>
        </Form>
      </ModalCenterContent>
    </Modal>
  );
}
