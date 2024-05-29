"use client";
import AlertModal from "@/app/_component/AlertModal";
import { ModalButton } from "@/app/_component/Button.style";
import DotsLoading from "@/app/_component/DotsLoading";
import ErrorModal from "@/app/_component/ErrorModal";
import Modal from "@/app/_component/Modal";
import { Header, ModalCenterContent, Title } from "@/app/_component/Modal.style";
import ModalCloseButton from "@/app/_component/ModalCloseButton";
import { replaceToNumber } from "@/app/_lib/regexp";
import useModalStore from "@/hook/useModalStore";
import callTms from "@/model/callTms";
import { ModalProps } from "@/model/modal/modalController";
import { B9001BData } from "@/type/api";
import { useMutation } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { Session } from "next-auth";
import { useState } from "react";
import { userListAtom } from "../_lib/atom";
import { UserlistRowData } from "./Table";
import {
  ButtonBox,
  Form,
  Input,
  InputBox,
  Label,
  List,
  Select,
  TextArea,
} from "./UpdateUserModal.style";

const ID = "updateUserModal";

enum RegisterInput {
  id = `${ID}Id`,
  name = `${ID}Name`,
  email = `${ID}Email`,
  tel = `${ID}Tel`,
  userLv = `${ID}UserLv`,
  memo = `${ID}Memo`,
}

interface UpdateUserModalProps {
  session: Session;
  rowData: UserlistRowData;
}

export default function UpdateUserModal({
  session,
  rowData,
  onClose,
}: ModalProps<UpdateUserModalProps>) {
  const [name, setName] = useState(rowData["사용자 명"]);
  const [email, setEmail] = useState(rowData["이메일"]);
  const [tel, setTel] = useState(rowData["전화번호"]);
  const [userLv, setUserLv] = useState(rowData["사용자 레벨"]);
  const [memo, setMemo] = useState(rowData["메모"]);

  const setUserList = useSetAtom(userListAtom);
  const modalStore = useModalStore();

  const mutateRegister = useMutation({
    mutationKey: ["B9001B"],
    mutationFn: async () => {
      const B9001BRes = await callTms<B9001BData>({
        session,
        svcId: "B9001B",
        data: [
          session.user.sessionId,
          session.user.sessionKey,
          rowData["사용자 ID"],
          name.trim(),
          email.trim() || " ", // 이메일이 없을 경우 빈 문자열로 전송
          tel.trim() || " ", // 전화번호가 없을 경우 빈 문자열로 전송
          userLv,
          memo.trim() || " ", // 메모가 없을 경우 빈 문자열로 전송
        ],
      });

      const B9001BData = B9001BRes.svcRspnData;

      if (!B9001BData) throw new Error("B9001BData is null");

      return B9001BData[0].F01;
    },
    onSuccess: async () => {
      setUserList((pre) => ({ ...pre, nonce: pre.nonce + 1 }));
      onClose();
    },
    onError: (error) => modalStore.push(ErrorModal, { props: { error } }),
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;

    switch (id) {
      case RegisterInput.name:
        setName(() => value);
        break;
      case RegisterInput.email:
        setEmail(() => value);
        break;
      case RegisterInput.tel:
        setTel(() => replaceToNumber(value));
        break;
      case RegisterInput.memo:
        if (value.length > 100) {
          // 메모는 최대 100자
          e.target.blur(); // focus out
          modalStore.push(AlertModal, {
            props: { content: "메모는 최대 100자까지 입력 가능합니다." },
          });
          return;
        }
        setMemo(() => value);
        break;
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutateRegister.mutate();
  };

  return (
    <Modal id={ID} onClose={onClose}>
      <ModalCenterContent>
        <ModalCloseButton onClose={onClose} />
        <Form onSubmit={onSubmit}>
          <Header>
            <Title>회원정보 수정</Title>
          </Header>
          <List>
            <InputBox>
              <Label htmlFor={RegisterInput.id}>사용자 ID</Label>
              <Input value={rowData["사용자 ID"]} id={RegisterInput.id} type="text" disabled />
            </InputBox>
            <InputBox>
              <Label className="essential" htmlFor={RegisterInput.name}>
                사용자 명
              </Label>
              <Input
                value={name}
                onChange={onChange}
                id={RegisterInput.name}
                type="text"
                required
              />
            </InputBox>
            <InputBox>
              <Label htmlFor={RegisterInput.email}>이메일</Label>
              <Input
                value={email}
                onChange={onChange}
                id={RegisterInput.email}
                type="email"
                placeholder="example@email.com"
              />
            </InputBox>
            <InputBox>
              <Label htmlFor={RegisterInput.tel}>전화번호</Label>
              <Input value={tel} onChange={onChange} id={RegisterInput.tel} type="tel" />
            </InputBox>
            <InputBox>
              <Label className="essential" htmlFor={RegisterInput.tel}>
                사용자 레벨
              </Label>
              <Select
                name="userLevel"
                id={RegisterInput.userLv}
                value={userLv}
                onChange={(e) => setUserLv(e.target.value)}
                required
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </Select>
            </InputBox>
            <InputBox>
              <Label htmlFor={RegisterInput.memo}>메모</Label>
              <TextArea
                id={RegisterInput.memo}
                value={memo}
                onChange={onChange}
                minRows={3}
                maxRows={5}
              />
            </InputBox>
          </List>
          <ButtonBox>
            <ModalButton type="submit" disabled={mutateRegister.isPending}>
              {mutateRegister.isPending ? <DotsLoading /> : "수정"}
            </ModalButton>
          </ButtonBox>
        </Form>
      </ModalCenterContent>
    </Modal>
  );
}
