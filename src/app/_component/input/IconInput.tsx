import { input, inputBox } from "./iconInput.css";

interface IconInputProps {
  value: string;
  id?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "password" | "text";
  placeholder?: string;
  leftSide?: React.ReactNode;
  rightSide?: React.ReactNode;
}

export default function IcontInput({
  value,
  id,
  onChange,
  type = "text",
  placeholder,
  leftSide,
  rightSide,
}: IconInputProps) {
  return (
    <div className={inputBox}>
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
