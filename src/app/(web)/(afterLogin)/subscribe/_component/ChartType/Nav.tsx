import { DefaultButton } from "@/app/_component/Button.style";
import useModalStore from "@/hook/useModalStore";
import styled from "@emotion/styled";
import { Session } from "next-auth";
import RegisterModifyModal from "./RegisterModifyModal";

const Wrap = styled.div`
  justify-content: flex-end;
  display: flex;
  align-items: center;
  height: 150px;
`;

interface NavProps {
  session: Session;
}

export default function Nav({ session }: NavProps) {
  const modalStore = useModalStore();

  const openRegisterChartTypeModal = async () => {
    modalStore.push(RegisterModifyModal, {
      props: {
        session,
      },
    });
  };

  return (
    <Wrap>
      <DefaultButton width={150} onClick={openRegisterChartTypeModal}>
        차트유형등록/수정
      </DefaultButton>
    </Wrap>
  );
}
