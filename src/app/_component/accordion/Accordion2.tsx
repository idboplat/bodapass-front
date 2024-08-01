import classNames from "classnames";
import React from "react";
import { SlArrowDown } from "react-icons/sl";
import * as css from "./accordion2.css";
import { useHotkeys } from "react-hotkeys-hook";

interface AccordionProps {
  isShow: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function Accordion2({ isShow, onClick, title, children, style }: AccordionProps) {
  const ref = useHotkeys<HTMLDivElement>("enter", onClick);

  return (
    <div className={css.accordion} style={style}>
      <div
        ref={ref}
        className={classNames(css.titleBox, isShow && "show")}
        onClick={onClick}
        tabIndex={0}
      >
        <span className={css.title}>{title}</span>
        <SlArrowDown className={classNames(css.icon, isShow && "show")} size={10} />
      </div>
      <div className={classNames(css.content, isShow && "show")}>{children}</div>
    </div>
  );
}
