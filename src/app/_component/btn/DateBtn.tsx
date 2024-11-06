import module from "./Btn.module.scss";

export default function DateBtn({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button className={module.dateBtn} onClick={onClick} type="button">
      {children}
    </button>
  );
}
