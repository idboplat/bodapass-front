import { ActionIcon, Title } from "@mantine/core";
import css from "./Header.module.scss";
import { IconArrowLeft } from "@tabler/icons-react";
import classNames from "classnames";

interface BackHeaderProps {
  title: string;
  onClickBack: () => void;
}

export default function BackHeader({ title, onClickBack }: BackHeaderProps) {
  return (
    <header className={css.header}>
      <div className={classNames(css.absoute, "back")}>
        <div className={css.inner}>
          <ActionIcon
            classNames={{ root: css.backButton }}
            variant="touch"
            onClick={onClickBack}
            size="md"
          >
            <IconArrowLeft width="1.75rem" height="1.75rem" />
          </ActionIcon>
          <Title component="h1">{title}</Title>
        </div>
      </div>
    </header>
  );
}
