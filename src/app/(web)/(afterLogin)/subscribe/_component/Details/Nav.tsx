import useModalStore from "@/hook/useModalStore";
import { Cell, Form, Input, Label, List } from "@/app/(web)/(afterLogin)/_component/Nav.style";
import { useSetAtom } from "jotai";
import { Session } from "next-auth";
import { FormEvent, useState } from "react";
import { subscribeDetailsAtom } from "../../_lib/atom";
import { ButtonBox, Wrap } from "./Nav.style";
import RegisterSubscrModal from "./RegisterSubscriptionModal";
import { DefaultButton } from "@/app/_component/Button.style";
import { format } from "date-fns";

interface NavProps {
  session: Session;
}

export default function Nav({ session }: NavProps) {
  const [userId, setUserId] = useState("");
  const [baseDt, setBaseDt] = useState(format(new Date(), "yyyy-MM-dd"));
  const setSubscrobeDetails = useSetAtom(subscribeDetailsAtom);

  const modalStore = useModalStore();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubscrobeDetails((pre) => ({
      userId: userId.trim(),
      baseDt: baseDt.replaceAll("-", "").trim(),
      cntuIqryKey: "",
      history: [],
      nonce: pre.nonce + 1,
    }));
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.currentTarget;

    switch (id) {
      case "userId":
        if (value.length > 9) return;
        setUserId(() => value);
        break;
      case "baseDt":
        setBaseDt(() => value);
        break;
    }
  };

  const openRegistModal = async () => {
    modalStore.push(RegisterSubscrModal, {
      props: {
        session,
      },
    });
  };

  return (
    <Wrap>
      <Form onSubmit={onSubmit}>
        <List>
          <Cell>
            <Label>사용자 ID</Label>
            <Input id="userId" type="text" value={userId} onChange={onChange} />
          </Cell>
          <Cell>
            <Label>기준 일자</Label>
            <Input id="baseDt" type="date" value={baseDt} onChange={onChange} />
          </Cell>
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
