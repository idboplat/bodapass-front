import { useHotkeys } from "react-hotkeys-hook";
import { light, btn } from "./toggleBtn.css";
import classNames from "classnames";

interface ToggleBtnProps {
  id?: string;
  value?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
  activeColor?: string;
}

export default function ToggleBtn({
  id,
  value,
  onClick = () => {},
  style,
  activeColor,
}: ToggleBtnProps) {
  const labelRef = useHotkeys<HTMLLabelElement>("enter", onClick);

  return (
    <label
      tabIndex={0}
      className={classNames(btn, value && "active")}
      ref={labelRef}
      style={{ "--toggleBtn-bgColor": activeColor, ...style } as React.CSSProperties}
    >
      <input
        id={id}
        tabIndex={-1}
        type="checkbox"
        className={light}
        checked={value}
        onChange={onClick}
      />
    </label>
  );
}
