import { IoIosCloseCircle } from "react-icons/io";
import module from "./ResetBtn.module.scss";

interface ResetButtonProps {
  id?: string;
  tabIndex?: number;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isShow: boolean;
}

export default function ResetButton({ id, tabIndex = -1, onClick, isShow }: ResetButtonProps) {
  if (!isShow) return null;
  return (
    <button className={module.btn} type="reset" id={id} onClick={onClick} tabIndex={tabIndex}>
      <IoIosCloseCircle size={17} color="#919492" />
    </button>
  );
}
