import { ModalButton } from "@/app/_component/Button.style";
import Modal from "@/app/_component/Modal";
import { ButtonBox, Inner, ModalCenterContent, Title } from "@/app/_component/Modal.style";
import { ModalProps } from "@/model/modal/modalController";

const ID = "registerCompleteModal";

interface RegisterCompleteModalProps {
  id: string;
  password: string;
}

export default function RegisterCompleteModal({
  id,
  password,
  onClose,
}: ModalProps<RegisterCompleteModalProps>) {
  return (
    // 확인을 눌렀을때만 닫히도록 동작
    <Modal id={ID} onClose={() => {}}>
      <ModalCenterContent>
        <Inner>
          <Title>회원정보 등록</Title>
          <p>회원이 등록되었습니다.</p>
          <p>{`사용자 ID : ${id}`}</p>
          <p>{`패스워드 : ${password}`}</p>
        </Inner>
        <ButtonBox>
          <ModalButton type="submit" onClick={onClose}>
            확인
          </ModalButton>
        </ButtonBox>
      </ModalCenterContent>
    </Modal>
  );
}
