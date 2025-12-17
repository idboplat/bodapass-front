import { Checkbox, CheckboxProps } from "@mantine/core";
import clsx from "clsx";
import css from "./custom-checkbox.module.scss";
import CheckIcon from "/public/assets/svg/check.svg";

interface CustomCheckboxProps extends CheckboxProps {
  className?: string;
  label?: string;
  required?: boolean;
  radius?: "xs" | "sm" | "md" | "lg" | "xl";
}

export default function CustomCheckbox({
  className,
  label,
  required,
  radius = "sm",
  ...props
}: CustomCheckboxProps) {
  return (
    <div className={css.wrapper}>
      <Checkbox
        icon={CheckIcon}
        variant="outline"
        color="#3D99D5"
        radius={radius}
        className={clsx(css.checkbox, className)}
        classNames={{
          input: css.checkboxInput,
          label: css.label,
        }}
        label={label}
        required={required}
        {...props}
      />
    </div>
  );
}
