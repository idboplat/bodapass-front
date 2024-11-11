import classNames from "classnames";
import { useHotkeys } from "react-hotkeys-hook";
import css from "./CheckBox.module.scss";

interface CheckBoxProps {
  id?: string;
  value?: boolean;
  onClick?: () => void;
  label?: string;
  checkBoxSize?: number;
  style?: React.CSSProperties;
}

export default function CheckBox({
  id,
  value,
  label,
  onClick = () => {},
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
        id={id}
        tabIndex={-1}
        className={css.input}
        type="checkbox"
        checked={value}
        onChange={onClick}
      />
      {!!label && <span>{label}</span>}
    </label>
  );
}
