import css from "./Backdrop.module.scss";

interface BackdropProps {
  onClick?: () => void;
}

export default function Backdrop({ onClick }: BackdropProps) {
  return <div className={css.backdrop} onClick={onClick} />;
}
