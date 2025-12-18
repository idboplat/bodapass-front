import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import css from "./outline-button.module.scss";

type ButtonVariant = "gradient" | "gray" | "deny" | "disabled";
type ButtonSize = "default" | "small";

interface OutlineButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  leftIcon?: ReactNode;
  size?: ButtonSize;
  fullWidth?: boolean;
}

export default function OutlineButton({
  variant = "gradient",
  leftIcon,
  size = "default",
  fullWidth = false,
  children,
  className,
  disabled,
  ...rest
}: OutlineButtonProps) {
  const isDisabled = disabled || variant === "disabled";

  return (
    <button
      type="button"
      className={clsx(
        css.button,
        css[variant],
        css[size],
        fullWidth && css.fullWidth,
        isDisabled && css.isDisabled,
        className,
      )}
      disabled={isDisabled}
      {...rest}
    >
      {leftIcon && <span className={css.icon}>{leftIcon}</span>}

      <span className={css.label}>{children}</span>
    </button>
  );
}
