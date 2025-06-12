import { ModalProps } from "@/stores/modal";
import { RemoveScroll } from "react-remove-scroll";
import { ModalBody, ModalFooter, ModalHeader, ModalInner, ModalTitle } from "./Components";
import { Button } from "@mantine/core";

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
          <Button variant="subtle" type="button" onClick={onClose} c="var(--mantine-default-color)">
            취소
          </Button>
          <Button variant="default" type="button" onClick={() => onSuccess(true)}>
            확인
          </Button>
        </ModalFooter>
      </ModalInner>
    </RemoveScroll>
  );
}
