import { useState } from "react";
import EyeToggleBtn from "../btn/EyeToggleBtn";
import ResetButton from "../btn/ResetBtn";
import { input, inputBox } from "./defaultInput.css";

interface DefaultInputProps {
  id?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset?: () => void;
  type?: "password" | "text";
  placeholder?: string;
  style?: React.CSSProperties;
}

export default function DefaultInput({
  value,
  id,
  onChange,
  type = "text",
  onReset,
  placeholder,
  style,
}: DefaultInputProps) {
  const [isShow, setShow] = useState(false);

  const toggleShow = () => setShow((prev) => !prev);

  return (
    <div className={inputBox} style={style}>
      <input
        id={id}
        type={isShow ? "text" : type}
        className={input}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {!!onReset && <ResetButton isShow={value !== ""} onClick={onReset} />}
      {type === "password" && <EyeToggleBtn value={isShow} onClick={toggleShow} />}
    </div>
  );
}
