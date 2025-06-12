import { useState } from "react";
import { ArrowDown } from "lucide-react";
import OutsideClickHandler from "react-outside-click-handler";
import css from "./TextSelect.module.scss";
import { clsx } from "clsx";

interface TextSelectProps {
  value: string | null;
  onChange: (value: string) => void;
  items: string[];
  placeholder?: string;
  style?: React.CSSProperties;
}

export default function TextSelect({
  value,
  items,
  onChange,
  placeholder = "선택",
  style,
}: TextSelectProps) {
  const [isShow, setIsShow] = useState(false);

  const onToggle = () => setIsShow((pre) => !pre);
  const onClose = () => setIsShow(() => false);

  const handleChange = (e: React.MouseEvent) => {
    const target = (e.target as HTMLElement).closest("li");
    const value = target?.dataset.value;
    if (value !== undefined) {
      onChange(value);
    }
    onClose();
  };

  const selectedIdx = items.findIndex((text) => text === value);
  const selectedItem = selectedIdx > -1 ? items[selectedIdx] : placeholder;

  return (
    <OutsideClickHandler onOutsideClick={onClose}>
      <div className={css.wrap} style={style}>
        <div className={css.selected} onClick={onToggle}>
          <span>{selectedItem}</span>
          <ArrowDown className={clsx(css.arrow, isShow && "show")} size={14} color="#919492" />
        </div>
        <div className={clsx(css.absolute, isShow && "show")}>
          <ul className={css.list} onClick={handleChange}>
            {items.map((text) => (
              <li key={text} className={css.item} data-value={text}>
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </OutsideClickHandler>
  );
}
