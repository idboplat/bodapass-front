import classNames from "classnames";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import * as css from "./accordion.css";
import { useHotkeys } from "react-hotkeys-hook";

interface AccordionProps {
  isShow: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function Accordion({ isShow, onClick, title, children, style }: AccordionProps) {
  const ref = useHotkeys<HTMLDivElement>("enter", onClick);

  return (
    <div className={css.accordion} style={style}>
      <div ref={ref} className={css.titleBox} onClick={onClick} tabIndex={0}>
        <span className={css.title}>{title}</span>
        <IoIosArrowDown className={classNames(css.icon, isShow && "show")} size={20} />
      </div>
      <div className={classNames(css.content, isShow && "show")}>{children}</div>
    </div>
  );
}
