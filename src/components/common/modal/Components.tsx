"use client";
import { ActionIcon } from "@mantine/core";
import css from "./Components.module.scss";
import { X } from "lucide-react";
import classNames from "classnames";
import { motion } from "motion/react";

interface ContainerProps {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  outSideClick?: () => void;
}

/** 모바일 모달 높이가 심하게 변동될경우 style={{ height: "100%" }} 추가 */
export function ModalInner({ children, className, style, outSideClick }: ContainerProps) {
  return (
    <div
      className={classNames(css.expand)}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          outSideClick?.();
        }
      }}
    >
      <motion.div
        initial={{ opacity: 0, transform: "translateY(10px)" }}
        animate={{ opacity: 1, transform: "translateY(0)" }}
        exit={{ opacity: 0, transform: "translateY(10px)" }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className={classNames(css.inner, className)}
        style={style}
      >
        {children}
      </motion.div>
    </div>
  );
}

interface ModalCloseButtonProps {
  className?: string;
  onClose?: () => void;
}

export function ModalCloseButton({ className, onClose }: ModalCloseButtonProps) {
  return (
    <ActionIcon
      variant="transparent"
      className={classNames(css.closeButton, className)}
      onClick={onClose}
    >
      <X size={20} />
    </ActionIcon>
  );
}

interface ModalHeaderProps {
  className?: string;
  children?: React.ReactNode;
}

export function ModalHeader({ children, className }: ModalHeaderProps) {
  return <div className={classNames(css.header, className)}>{children}</div>;
}

interface ModalTitleProps {
  className?: string;
  children?: React.ReactNode;
}

export function ModalTitle({ children, className }: ModalTitleProps) {
  return <h2 className={classNames(className, css.title)}>{children}</h2>;
}

interface ModalBodyProps {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function ModalBody({ children, className, style }: ModalBodyProps) {
  return (
    <div className={classNames(css.body, className)} style={style}>
      {children}
    </div>
  );
}

interface ModalFooterProps {
  className?: string;
  children?: React.ReactNode;
}

export function ModalFooter({ children, className }: ModalFooterProps) {
  return <div className={classNames(css.footer, className)}>{children}</div>;
}
