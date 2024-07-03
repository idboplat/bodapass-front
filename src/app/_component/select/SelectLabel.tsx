import { label } from "./selectLabel.css";

interface SelectLabel {
  children: React.ReactNode;
}

export default function SelectLabel({ children }: SelectLabel) {
  return <label className={label}>{children}</label>;
}
