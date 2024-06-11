import { input, inputBox } from "./iconInput.css";

interface IconInputProps {
  id?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "password" | "text";
  placeholder?: string;
  leftSide?: React.ReactNode;
  rightSide?: React.ReactNode;
  style?: React.CSSProperties;
}

export default function IcontInput({
  value,
  id,
  onChange,
  type = "text",
  placeholder,
  leftSide,
  rightSide,
  style,
}: IconInputProps) {
  return (
    <div className={inputBox} style={style}>
      {leftSide}
      <input
        id={id}
        type={type}
        className={input}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {rightSide}
    </div>
  );
}
