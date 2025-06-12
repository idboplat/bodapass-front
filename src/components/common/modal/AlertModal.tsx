import { ModalProps } from "@/stores/modal";
import { Button } from "@mantine/core";
import { RemoveScroll } from "react-remove-scroll";
import { ModalBody, ModalFooter, ModalHeader, ModalInner, ModalTitle } from "./Components";

interface AlertModalProps {
  title?: string;
  content: React.ReactNode;
}

export default function AlertModal({
  title = "Alert",
  onClose,
  content,
}: ModalProps<AlertModalProps>) {
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
          <Button variant="default" type="button" onClick={onClose}>
            확인
          </Button>
        </ModalFooter>
      </ModalInner>
    </RemoveScroll>
  );
}
