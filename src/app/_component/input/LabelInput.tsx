import classNames from "classnames";
import { useState } from "react";
import ResetButton from "../btn/ResetBtn";
import * as css from "./labelInput.css";

interface LabelInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  onReset?: () => void;
  type?: "password" | "text";
  placeholder?: string;
  style?: React.CSSProperties;
}

export default function LabelInput({
  id,
  value,
  onChange,
  onReset,
  type,
  label,
  placeholder,
  style,
}: LabelInputProps) {
  const [focus, setFocus] = useState(false);

  const onFocus = () => setFocus(true);

  return (
    <div className={classNames(css.labelInputBox, focus && "focus")} style={style}>
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
      />
      {!!onReset && <ResetButton isShow={value !== ""} onClick={onReset} />}
    </div>
  );
}
