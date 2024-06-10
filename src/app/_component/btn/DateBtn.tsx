import { dateBtn } from "./btn.css";

export default function DateBtn({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button className={dateBtn} onClick={onClick}>
      {children}
    </button>
  );
}
