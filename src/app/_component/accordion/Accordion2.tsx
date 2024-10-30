import classNames from "classnames";
import React from "react";
import { SlArrowDown } from "react-icons/sl";
import * as css from "./accordion2.css";
import { getHotkeyHandler } from "@mantine/hooks";

interface AccordionProps {
  isShow: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function Accordion2({ isShow, onClick, title, children, style }: AccordionProps) {
  return (
    <div className={css.accordion} style={style}>
      <div
        className={classNames(css.titleBox, isShow && "show")}
        onClick={onClick}
        tabIndex={0}
        onKeyDown={getHotkeyHandler([["enter", onClick]])}
      >
        <span className={css.title}>{title}</span>
        <SlArrowDown className={classNames(css.icon, isShow && "show")} size={10} />
      </div>
      <div className={classNames(css.content, isShow && "show")}>{children}</div>
    </div>
  );
}
