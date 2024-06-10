import { useState } from "react";
import ResetButton from "../btn/ResetBtn";
import { input, inputBox } from "./underLineInput.css";
import EyeToggleBtn from "../btn/EyeToggleBtn";

interface UnderLineInputProps {
  value: string;
  id?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset?: () => void;
  type?: "password" | "text";
}

export default function UnderLineInput({
  id,
  value,
  onChange,
  onReset,
  type = "text",
}: UnderLineInputProps) {
  const [isShow, setShow] = useState(false);

  const toggleShow = () => setShow((prev) => !prev);

  return (
    <div className={inputBox}>
      <input
        className={input}
        id={id}
        type={isShow ? "text" : type}
        value={value}
        onChange={onChange}
      />
      {!!onReset && <ResetButton isShow={value !== ""} onClick={onReset} />}
      {type === "password" && <EyeToggleBtn value={isShow} onClick={toggleShow} />}
    </div>
  );
}
