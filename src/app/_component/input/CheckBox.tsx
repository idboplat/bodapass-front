import classNames from "classnames";
import * as css from "./checkBox.css";
import { useHotkeys } from "react-hotkeys-hook";

interface CheckBoxProps {
  value: boolean;
  label?: string;
  onClick: () => void;
  checkBoxSize?: number;
  style?: React.CSSProperties;
}

export default function CheckBox({
  value,
  label,
  onClick,
  style,
  checkBoxSize = 14,
}: CheckBoxProps) {
  const labelRef = useHotkeys<HTMLLabelElement>("enter", onClick);

  return (
    <label
      tabIndex={0}
      className={classNames(css.label, value && "checked")}
      ref={labelRef}
      style={
        {
          "--checkBox-size": checkBoxSize + "px",
          ...style,
        } as React.CSSProperties
      }
    >
      <input
        tabIndex={-1}
        className={css.input}
        type="checkbox"
        checked={value}
        onChange={onClick}
      />
      {!!label && <span className={css.span}>{label}</span>}
    </label>
  );
}
