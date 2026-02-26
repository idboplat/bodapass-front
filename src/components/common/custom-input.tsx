import { Input, InputProps, PasswordInput } from "@mantine/core";
import clsx from "clsx";
import css from "./custom-input.module.scss";

interface CustomInputProps extends Omit<InputProps, "onChange"> {
  className?: string;
  value?: string | undefined;
  defaultValue?: string | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  label?: string;
  required?: boolean;
  type?: "text" | "password";
  classNames?: InputProps["classNames"] & {
    label?: string;
    required?: string;
  };
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  autoComplete?: string;
  readOnly?: boolean;
  inputMode?: "text" | "numeric" | "tel" | "email" | "url" | "search";
}

export function CustomInput({
  className,
  value,
  defaultValue,
  onChange,
  placeholder = "",
  label = "",
  required = false,
  type = "text",
  classNames,
  onFocus,
  onBlur,
  autoComplete = "off",
  readOnly = false,
  inputMode = "text",
  ...props
}: CustomInputProps) {
  const {
    label: labelClassName,
    required: requiredClassName,
    ...inputClassNames
  } = classNames || {};

  const { error, ...inputProps } = props as any;

  return (
    <div className={css.wrapper}>
      <Input.Wrapper
        label={label}
        style={{ textAlign: "left", fontSize: "14px", fontColor: "#333" }}
        required={required}
        error={error}
        classNames={{
          label: labelClassName,
          required: requiredClassName,
        }}
      >
        <Input
          value={value}
          defaultValue={defaultValue}
          onChange={(e) => {
            if (onChange) {
              const handler = onChange as any;
              // 이벤트 핸들러로 시도하고, 실패하면 value만 전달
              try {
                handler(e);
              } catch {
                handler(e.target.value);
              }
            }
          }}
          color="#ededed"
          className={clsx(css.input, className)}
          placeholder={placeholder}
          classNames={{
            input: (inputClassNames as any)?.input || css.input,
            ...(inputClassNames as any),
          }}
          styles={{
            input: {
              border: "none",
            },
          }}
          type={type}
          onFocus={(e) => {
            if (onFocus) {
              const handler = onFocus as any;
              try {
                handler(e);
              } catch {
                handler();
              }
            }
          }}
          onBlur={(e) => {
            if (onBlur) {
              const handler = onBlur as any;
              try {
                handler(e);
              } catch {
                handler();
              }
            }
          }}
          autoComplete={autoComplete}
          readOnly={readOnly}
          inputMode={inputMode}
          {...inputProps}
        />
      </Input.Wrapper>
    </div>
  );
}

export function CustomInputPassword({
  className,
  value,
  defaultValue,
  onChange,
  placeholder = "",
  label = "",
  required = false,
  classNames,
  onFocus,
  onBlur,
  autoComplete = "off",
  readOnly = false,
  inputMode = "text",
  ...props
}: CustomInputProps) {
  const {
    label: labelClassName,
    required: requiredClassName,
    ...inputClassNames
  } = classNames || {};

  const { error, ...inputProps } = props as any;

  return (
    <div className={css.wrapper}>
      <Input.Wrapper
        label={label}
        style={{ textAlign: "left", fontSize: "14px", fontColor: "#333" }}
        required={required}
        error={error}
        classNames={{
          label: labelClassName,
          required: requiredClassName,
        }}
      >
        <PasswordInput
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          color="#ededed"
          className={clsx(css.input, className)}
          placeholder={placeholder}
          classNames={{
            input: (inputClassNames as any)?.input || css.input,
            ...(inputClassNames as any),
          }}
          styles={
            {
              input: {
                border: "none",
              },
            } as any
          }
          onFocus={onFocus}
          onBlur={onBlur}
          autoComplete={autoComplete}
          readOnly={readOnly}
          {...inputProps}
        />
      </Input.Wrapper>
    </div>
  );
}
