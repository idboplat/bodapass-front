import { ModalProps } from "@/types/common";
import { ModalBody, ModalFooter, ModalHeader, ModalInner, ModalTitle } from "./components";
import { Button, RemoveScroll } from "@mantine/core";

interface ConfirmModalProps {
  title?: string;
  content: React.ReactNode;
}

export default function ConfirmModal({
  title = "Confirm",
  content,
  onClose,
  onSuccess,
}: ModalProps<ConfirmModalProps>) {
  return (
    <RemoveScroll removeScrollBar={false}>
      <ModalInner style={{ maxWidth: "500px" }} outSideClick={onClose}>
        <ModalHeader>
          <div>
            <ModalTitle>{title}</ModalTitle>
          </div>
        </ModalHeader>
        <ModalBody>
          <div>
            <p>{content}</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="default"
            type="button"
            onClick={onClose}
            c="var(--mantine-default-color)"
          >
            취소
          </Button>
          <Button variant="filled" type="button" onClick={() => onSuccess(true)}>
            확인
          </Button>
        </ModalFooter>
      </ModalInner>
    </RemoveScroll>
  );
}
