"use client";
import { ModalProps } from "@/model/modal/modalController";
import Modal from "./Modal";
import { ButtonBox, Header, Inner, ModalCenterContent, Title } from "./Modal.style";
import ModalCloseButton from "./ModalCloseButton";
import styled from "@emotion/styled";
import { ModalButton } from "./Button.style";

const ID = "errorModal";

interface ErrorModalProps {
  title?: string;
  error: Error;
}

export default function ErrorModal({
  title = "Message",
  onClose,
  error,
}: ModalProps<ErrorModalProps>) {
  return (
    <Modal id={ID} onClose={onClose}>
      <ModalCenterContent>
        <ModalCloseButton onClose={onClose} />
        <Inner>
          <Header>
            <Title>{title}</Title>
          </Header>
          <p>{error.message}</p>
        </Inner>
        <ButtonBox>
          <ModalButton onClick={onClose}>확인</ModalButton>
        </ButtonBox>
      </ModalCenterContent>
    </Modal>
  );
}
