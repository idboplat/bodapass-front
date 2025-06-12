import { ModalProps } from "@/stores/modal";
import { RemoveScroll } from "react-remove-scroll";
import OutsideClickHandler from "react-outside-click-handler";
import { Button } from "@mantine/core";
import {
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  ModalHeader,
  ModalInner,
  ModalTitle,
} from "./Components";

interface ErrorModalProps {
  title?: string;
  error: Error;
}

export default function ErrorModal({
  title = "Message",
  onClose,
  error,
}: ModalProps<ErrorModalProps>) {
  console.log("error-modal:", error);
  return (
    <RemoveScroll removeScrollBar={false}>
      <OutsideClickHandler onOutsideClick={onClose}>
        <ModalInner style={{ maxWidth: "500px" }}>
          <ModalCloseButton onClose={onClose} />
          <ModalHeader>
            <div>
              <ModalTitle>{title}</ModalTitle>
            </div>
          </ModalHeader>
          <ModalBody>
            <div>
              <p>{error.message}</p>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="default" type="button" onClick={onClose}>
              확인
            </Button>
          </ModalFooter>
        </ModalInner>
      </OutsideClickHandler>
    </RemoveScroll>
  );
}
