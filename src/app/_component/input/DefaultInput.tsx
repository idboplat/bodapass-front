import { useState } from "react";
import EyeToggleBtn from "../btn/EyeToggleBtn";
import ResetButton from "../btn/ResetBtn";
import { input, inputBox } from "./defaultInput.css";
import classNames from "classnames";

interface DefaultInputProps {
  id?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset?: () => void;
  type?: "password" | "text";
  placeholder?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
}

export default function DefaultInput({
  value,
  id,
  onChange,
  type = "text",
  onReset,
  placeholder,
  style,
  disabled,
}: DefaultInputProps) {
  const [isShow, setShow] = useState(false);

  const toggleShow = () => setShow((prev) => !prev);

  return (
    <div className={classNames(inputBox, disabled && "disabled")} style={style}>
      <input
        id={id}
        type={isShow ? "text" : type}
        className={input}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
      {!!onReset && disabled === false && <ResetButton isShow={value !== ""} onClick={onReset} />}
      {type === "password" && <EyeToggleBtn value={isShow} onClick={toggleShow} />}
    </div>
  );
}
