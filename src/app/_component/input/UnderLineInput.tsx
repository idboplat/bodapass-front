import { useState } from "react";
import ResetButton from "../btn/ResetBtn";
import { input, inputBox } from "./underLineInput.css";
import EyeToggleBtn from "../btn/EyeToggleBtn";

interface UnderLineInputProps {
  id?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset?: () => void;
  type?: "password" | "text";
  placeholder?: string;
  style?: React.CSSProperties;
}

export default function UnderLineInput({
  id,
  value,
  onChange,
  onReset,
  type = "text",
  placeholder,
  style,
}: UnderLineInputProps) {
  const [isShow, setShow] = useState(false);

  const toggleShow = () => setShow((prev) => !prev);

  return (
    <div className={inputBox} style={style}>
      <input
        className={input}
        id={id}
        type={isShow ? "text" : type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {!!onReset && <ResetButton isShow={value !== ""} onClick={onReset} />}
      {type === "password" && <EyeToggleBtn value={isShow} onClick={toggleShow} />}
    </div>
  );
}
