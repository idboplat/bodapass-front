import { ActionIcon, Button, Title } from "@mantine/core";
import Link from "next/link";
import css from "./Header.module.scss";
import { IconArrowLeft } from "@tabler/icons-react";

interface BackHeaderProps {
  title: string;
  onClickBack: () => void;
}

export default function BackHeader({ title, onClickBack }: BackHeaderProps) {
  return (
    <header className={css.header}>
      <div className={css.inner}>
        <ActionIcon variant="transparent" onClick={onClickBack}>
          <IconArrowLeft width="2rem" height="2rem" />
        </ActionIcon>
        <Title component="h1">{title}</Title>
        <div></div>
      </div>
    </header>
  );
}
