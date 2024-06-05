import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { button } from "./eyeToggleBtn.css";

interface EyeToggleBtnProps {
  value: boolean;
  onClick: () => void;
}

export default function EyeToggleBtn({ value, onClick }: EyeToggleBtnProps) {
  const onClickBtn = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <button className={button} type="button" tabIndex={-1} onClick={onClickBtn}>
      {value ? (
        <AiFillEye size="17px" color="#919492" />
      ) : (
        <AiFillEyeInvisible size="17px" color="#919492" />
      )}
    </button>
  );
}
