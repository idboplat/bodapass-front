import { Input, InputProps, PasswordInput } from "@mantine/core";
import clsx from "clsx";
import css from "./custom-input.module.scss";

interface CustomInputProps extends InputProps {
  className?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
}

export function CustomInput({
  className,
  value,
  onChange,
  placeholder = "",
  label = "",
  required = false,
}: CustomInputProps) {
  return (
    <div className={css.wrapper}>
      <Input.Wrapper
        label={label}
        style={{ textAlign: "left", fontSize: "14px", fontColor: "#333" }}
        required={required}
      >
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          color="#ededed"
          className={clsx(css.input, className)}
          placeholder={placeholder}
          classNames={{
            input: css.input,
          }}
        />
      </Input.Wrapper>
    </div>
  );
}

export function CustomInputPassword({ className, value, onChange }: CustomInputProps) {
  return (
    <div className={css.wrapper}>
      <PasswordInput
        value={value}
        onChange={(e) => onChange(e.target.value)}
        color="#ededed"
        className={clsx(css.input, className)}
        classNames={{
          input: css.input,
        }}
      />
    </div>
  );
}
