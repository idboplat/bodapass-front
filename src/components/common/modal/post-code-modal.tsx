import { RemoveScroll } from "@mantine/core";
import { ModalCloseButton, ModalHeader, ModalInner } from "./components";
import DaumPostcodeEmbed, { DaumPostcodeEmbedProps } from "react-daum-postcode";

interface PostCodeModalProps extends DaumPostcodeEmbedProps {
  onClose: () => void;
}

export default function PostCodeModal({ onClose, ...props }: PostCodeModalProps) {
  return (
    <RemoveScroll removeScrollBar={false}>
      <ModalInner outSideClick={onClose} fullSize style={{ padding: "0px" }}>
        <ModalCloseButton onClose={onClose} />
        <ModalHeader />
        <DaumPostcodeEmbed {...props} style={{ height: "100%" }} />
      </ModalInner>
    </RemoveScroll>
  );
}
