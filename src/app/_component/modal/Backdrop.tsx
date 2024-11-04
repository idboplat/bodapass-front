import module from "./Backdrop.module.scss";

interface BackdropProps {
  onClick?: () => void;
}

export default function Backdrop({ onClick }: BackdropProps) {
  return <div className={module.backdrop} onClick={onClick} />;
}
