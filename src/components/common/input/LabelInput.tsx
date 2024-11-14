import { Input, InputProps, TextInputProps } from "@mantine/core";
import { useId, useMergedRef } from "@mantine/hooks";
import cx from "classnames";
import { FocusEvent, forwardRef, useRef } from "react";
import css from "./LabelInput.module.scss";

type MantineInputProps = TextInputProps & InputProps;

interface LabelInputProps extends MantineInputProps {
  id?: string;
  label: string;
  value?: string;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export default forwardRef<HTMLInputElement, LabelInputProps>(function LabelInput(
  {
    id,
    name,
    className,
    value,
    onChange,
    onReset,
    type = "text",
    placeholder,
    classNames,
    styles,
    vars,
    leftSection,
    rightSection,
    onFocus,
    onBlur,
    ...props
  },
  forwardedRef,
) {
  const inputId = useId(id);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mergedRef = useMergedRef<HTMLInputElement>(forwardedRef, inputRef);

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    wrapperRef.current?.classList.add("focus", "typing");
    onFocus?.(e);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    wrapperRef.current?.classList.remove("typing");
    onBlur?.(e);
  };

  return (
    <Input.Wrapper
      id={inputId} // id를 input에 직접 전달해서는 안됨
      ref={wrapperRef}
      className={cx(css.labelInputBox, className)}
      {...props}
    >
      <Input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={css.input}
        classNames={classNames}
        leftSection={leftSection}
        rightSection={rightSection}
        ref={mergedRef}
        vars={vars}
        styles={styles}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
      />
    </Input.Wrapper>
  );
});
