import { flexCenter } from "@/style/mixin";
import styled from "@emotion/styled";
import { IoCloseOutline } from "react-icons/io5";

const Button = styled.button`
  ${flexCenter}
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 3px;
  transition: color 0.2s ease, background-color 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.45);
    color: white;
  }
`;

export default function ModalCloseButton({ onClose }: { onClose: () => void }) {
  return (
    <Button type="button" onClick={onClose}>
      <IoCloseOutline size={28} />
    </Button>
  );
}
