import classNames from "classnames";
import { useState } from "react";
import ResetButton from "../btn/ResetBtn";
import css from "./LabelInput.module.scss";

interface LabelInputProps {
  id: string;
  label: string;
  value?: string;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
  onReset?: () => void;
  type?: "password" | "text";
  placeholder?: string;
  style?: React.CSSProperties;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export default function LabelInput({
  id,
  value,
  onChange,
  onReset,
  type = "text",
  label,
  placeholder,
  style,
  inputRef,
}: LabelInputProps) {
  const [focus, setFocus] = useState(false);

  const onFocus = () => setFocus(true);

  return (
    <div className={classNames(css.labelInputBox, { focus })} style={style}>
      <label htmlFor={id} className={css.label}>
        {label}
      </label>
      <input
        id={id}
        className={css.input}
        onFocus={onFocus}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        ref={inputRef}
      />
      {!!onReset && <ResetButton isShow={value !== ""} onClick={onReset} />}
    </div>
  );
}
