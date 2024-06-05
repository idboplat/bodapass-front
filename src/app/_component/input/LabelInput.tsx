import { useState } from "react";
import classNames from "classnames";
import EyeToggleBtn from "../btn/EyeToggleBtn";
import * as css from "./labelInput.css";

interface LabelInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "password" | "text";
  placeholder?: string;
  style?: React.CSSProperties;
}

export default function LabelInput({
  id,
  value,
  onChange,
  type,
  label,
  placeholder,
  style,
}: LabelInputProps) {
  const [focus, setFocus] = useState(false);
  const [show, setShow] = useState(false);

  const onFocus = () => setFocus(true);

  const onBlur = () => {
    if (value === "") {
      //입력값이 없을때
      setShow(() => false); // 비밀번호 숨기기
      setFocus(() => false); // 라벨 원래대로
    }
  };

  const toggleShow = () => setShow((prev) => !prev);

  return (
    <div className={classNames(css.labelInputBox, focus && "focus")} style={style}>
      <label htmlFor={id} className={css.label}>
        {label}
      </label>
      <input
        id={id}
        className={css.input}
        onFocus={onFocus}
        onBlur={onBlur}
        type={show ? "text" : type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {type === "password" && focus && <EyeToggleBtn value={show} onClick={toggleShow} />}
    </div>
  );
}
