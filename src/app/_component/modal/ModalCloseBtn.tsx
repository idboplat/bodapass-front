import { IoCloseOutline } from "react-icons/io5";
import module from "./ModalCloseBtn.module.scss";
import classNames from "classnames";

export default function ModalCloseBtn({ onClose }: { onClose: () => void }) {
  return (
    <button className={classNames(module.button, "active")} type="button" onClick={onClose}>
      <IoCloseOutline size={28} />
    </button>
  );
}
