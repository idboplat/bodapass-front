import { HTMLInputTypeAttribute, useState } from "react";
import EyeToggleBtn from "../btn/EyeToggleBtn";
import ResetButton from "../btn/ResetBtn";
import css from "./DefaultInput.module.scss";
import classNames from "classnames";

interface DefaultInputProps {
  id?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset?: () => void;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  required?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
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
  required,
  inputRef,
}: DefaultInputProps) {
  const [isShow, setShow] = useState(false);

  const toggleShow = () => setShow((prev) => !prev);

  return (
    <div className={classNames(css.inputBox, disabled && "disabled")} style={style}>
      <input
        id={id}
        type={isShow ? "text" : type}
        className={css.input}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        ref={inputRef}
      />
      {!!onReset && <ResetButton isShow={value !== ""} onClick={onReset} />}
      {type === "password" && <EyeToggleBtn value={isShow} onClick={toggleShow} />}
    </div>
  );
}
