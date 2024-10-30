import { getHotkeyHandler } from "@mantine/hooks";
import classNames from "classnames";
import { btn, light } from "./toggleBtn.css";

interface ToggleBtnProps {
  id?: string;
  value?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
  activeColor?: string;
  disabled?: boolean;
}

export default function ToggleBtn({
  id,
  value,
  onClick = () => {},
  style,
  activeColor,
  disabled,
}: ToggleBtnProps) {
  const enterPress = () => {
    if (!disabled) onClick();
  };

  return (
    <label
      tabIndex={0}
      className={classNames(btn, value && "active", disabled && "disabled")}
      onKeyDown={getHotkeyHandler([["enter", enterPress]])}
      style={{ "--toggleBtn-bgColor": activeColor, ...style } as React.CSSProperties}
    >
      <input
        id={id}
        tabIndex={-1}
        type="checkbox"
        className={light}
        checked={value}
        onChange={onClick}
        disabled={disabled}
      />
    </label>
  );
}
