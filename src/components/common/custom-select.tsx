import { Select, SelectProps } from "@mantine/core";
import clsx from "clsx";
import css from "./custom-select.module.scss";
import ChevronDownIcon from "/public/assets/svg/chevron-down.svg";

interface CustomSelectProps extends SelectProps {
  className?: string;
  label?: string;
  required?: boolean;
  searchable?: boolean;
}

export default function CustomSelect({
  className,
  label,
  required,
  searchable,
  ...props
}: CustomSelectProps) {
  return (
    <div className={css.wrapper}>
      <Select
        label={label}
        searchable={searchable}
        required={required}
        className={clsx(css.select, className)}
        rightSection={<ChevronDownIcon />}
        classNames={{
          input: css.input,
          label: css.label,
        }}
        {...props}
      />
    </div>
  );
}
