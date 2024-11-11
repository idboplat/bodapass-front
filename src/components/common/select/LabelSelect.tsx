import css from "./LabelSelect.module.scss";

interface LabelSelectProps {
  children: React.ReactNode;
}

export default function LabelSelect({ children }: LabelSelectProps) {
  return <label className={css.label}>{children}</label>;
}
