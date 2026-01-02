import { RemoveScroll } from "@mantine/core";
import { ModalCloseButton, ModalHeader, ModalInner } from "./components";
import DaumPostcodeEmbed, { DaumPostcodeEmbedProps } from "react-daum-postcode";

interface PostCodeModalProps extends DaumPostcodeEmbedProps {
  onClose: () => void;
}

export default function PostCodeModal({ onClose, ...props }: PostCodeModalProps) {
  return (
    <RemoveScroll removeScrollBar={false}>
      <ModalInner
        outSideClick={onClose}
        fullSize
        style={{
          padding: "0px",
          backgroundColor: "#ececec",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      >
        <ModalCloseButton onClose={onClose} />
        <div style={{ height: 50, borderBottom: "2px solid #e1e1e1" }} />
        <DaumPostcodeEmbed {...props} style={{ height: "100%" }} />
      </ModalInner>
    </RemoveScroll>
  );
}
