import css from "./backdrop.module.scss";

interface BackdropProps {
  onClick?: () => void;
}

export default function Backdrop({ onClick }: BackdropProps) {
  return <div className={css.backdrop} onClick={onClick} />;
}
