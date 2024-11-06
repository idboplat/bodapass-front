import { useState } from "react";
import ResetButton from "../btn/ResetBtn";
import module from "./UnderLineInput.module.scss";
import EyeToggleBtn from "../btn/EyeToggleBtn";

interface UnderLineInputProps {
  id?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset?: () => void;
  type?: "password" | "text";
  placeholder?: string;
  style?: React.CSSProperties;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export default function UnderLineInput({
  id,
  value,
  onChange,
  onReset,
  type = "text",
  placeholder,
  style,
  inputRef,
}: UnderLineInputProps) {
  const [isShow, setShow] = useState(false);

  const toggleShow = () => setShow((prev) => !prev);

  return (
    <div className={module.inputBox} style={style}>
      <input
        className={module.input}
        id={id}
        type={isShow ? "text" : type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        ref={inputRef}
      />
      {!!onReset && <ResetButton isShow={value !== ""} onClick={onReset} />}
      {type === "password" && <EyeToggleBtn value={isShow} onClick={toggleShow} />}
    </div>
  );
}
