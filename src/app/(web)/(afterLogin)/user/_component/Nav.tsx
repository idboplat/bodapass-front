"use client";
import { DefaultButton } from "@/app/_component/Button.style";
import { replaceToNumber } from "@/app/_lib/regexp";
import useModalStore from "@/hook/useModalStore";
import {
  ButtonBox,
  Cell,
  CellPlaceholder,
  Form,
  Input,
  Label,
  List,
  Wrap,
} from "@/app/(web)/(afterLogin)/_component/Nav.style";
import { useSetAtom } from "jotai";
import { Session } from "next-auth";
import { FormEvent, useState } from "react";
import { userListAtom } from "../_lib/atom";
import RegisterModal from "./RegisterModal";

const ID = "userNav";

enum NavInput {
  id = `${ID}Id`,
  name = `${ID}Name`,
  email = `${ID}Email`,
  tel = `${ID}Tel`,
  level = `${ID}Level`,
  startDate = `${ID}StartDate`,
  endDate = `${ID}EndDate`,
}

interface NavProps {
  session: Session;
}

export default function Nav({ session }: NavProps) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [level, setLevel] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const setUserList = useSetAtom(userListAtom);

  const modalStore = useModalStore();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setUserList((pre) => ({
      rowIndex: null,
      id: id.trim(),
      name: name.trim(),
      email: email.trim(),
      tel: tel.trim(),
      level,
      startDate: startDate.replaceAll("-", "").trim(),
      endDate: endDate.replaceAll("-", "").trim(),
      cntuIqryKey: "",
      history: [],
      nonce: pre.nonce + 1,
    }));
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.currentTarget;

    switch (id) {
      case NavInput.id:
        if (value.length > 9) return;
        setId(() => value);
        break;
      case NavInput.name:
        setName(() => value);
        break;
      case NavInput.email:
        setEmail(() => value);
        break;
      case NavInput.tel:
        setTel(() => replaceToNumber(value));
        break;
      case NavInput.level:
        //1자리 숫자만 입력 가능
        if (value.length > 1) return;
        setLevel(() => replaceToNumber(value));
        break;
      case NavInput.startDate:
        setStartDate(() => value);
        break;
      case NavInput.endDate:
        setEndDate(() => value);
        break;
    }
  };

  const openRegistModal = async () => {
    modalStore.push(RegisterModal, { props: { session } });
  };

  return (
    <Wrap>
      <Form onSubmit={onSubmit}>
        <List>
          <Cell>
            <Label htmlFor={NavInput.id}>사용자 ID</Label>
            <Input id={NavInput.id} type="text" value={id} onChange={onChange} />
          </Cell>
          <Cell>
            <Label htmlFor={NavInput.name}>사용자 명</Label>
            <Input id={NavInput.name} type="text" value={name} onChange={onChange} />
          </Cell>
          <Cell>
            <Label htmlFor={NavInput.email}>이메일</Label>
            <Input id={NavInput.email} type="email" value={email} onChange={onChange} />
          </Cell>
          <Cell>
            <Label htmlFor={NavInput.tel}>전화번호</Label>
            <Input id={NavInput.tel} type="tel" value={tel} onChange={onChange} />
          </Cell>
          <Cell>
            <Label htmlFor={NavInput.level}>사용자 레벨</Label>
            <Input id={NavInput.level} type="text" value={level} onChange={onChange} />
          </Cell>
          <Cell>
            <Label htmlFor={NavInput.startDate}>구독시작일</Label>
            <Input id={NavInput.startDate} type="date" value={startDate} onChange={onChange} />
          </Cell>
          <Cell>
            <Label htmlFor={NavInput.endDate}>구독만료일</Label>
            <Input id={NavInput.endDate} type="date" value={endDate} onChange={onChange} />
          </Cell>
          {new Array(6).fill(null).map((_, index) => {
            return <CellPlaceholder key={`placeholder_${index}`} />;
          })}
        </List>
        <ButtonBox>
          <DefaultButton width={80} type="submit">
            조회
          </DefaultButton>
          <DefaultButton width={80} type="button" onClick={openRegistModal}>
            등록
          </DefaultButton>
        </ButtonBox>
      </Form>
    </Wrap>
  );
}
