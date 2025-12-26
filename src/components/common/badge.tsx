import { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import css from "./badge.module.scss";

type ButtonVariant = "gradient" | "gray" | "deny" | "disabled";

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: ButtonVariant;
  leftIcon?: ReactNode;
}

export default function Badge({
  variant = "gradient",
  leftIcon,
  children,
  className,
  ...rest
}: BadgeProps) {
  return (
    <div className={clsx(css.badge, css[variant], className)} {...rest}>
      {leftIcon && <span className={css.icon}>{leftIcon}</span>}

      <span className={css.label}>{children}</span>
    </div>
  );
}
