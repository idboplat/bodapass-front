import module from "./Badge.module.scss";

interface BadgeProps {}

export default function Badge({}: BadgeProps) {
  return <span className={module.badge} />;
}
