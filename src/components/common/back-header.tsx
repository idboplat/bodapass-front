import { ActionIcon, Title } from "@mantine/core";
import css from "./header.module.scss";
import { ArrowLeft } from "lucide-react";
import { clsx } from "clsx";

interface BackHeaderProps {
  title: string;
  onClickBack: () => void;
}

export default function BackHeader({ title, onClickBack }: BackHeaderProps) {
  return (
    <header className={css.header}>
      <div className={clsx(css.absoute, "back")}>
        <div className={css.inner}>
          <ActionIcon
            classNames={{ root: css.backButton }}
            variant="touch"
            onClick={onClickBack}
            size="md"
          >
            <ArrowLeft width="1.75rem" height="1.75rem" />
          </ActionIcon>
          <Title component="h1">{title}</Title>
        </div>
      </div>
    </header>
  );
}
