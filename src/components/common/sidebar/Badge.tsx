import css from "./Badge.module.scss";

interface BadgeProps {}

export default function Badge({}: BadgeProps) {
  return <span className={css.badge} />;
}
