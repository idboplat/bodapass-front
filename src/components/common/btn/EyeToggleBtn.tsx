import { ActionIcon } from "@mantine/core";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

interface EyeToggleBtnProps {
  value: boolean;
  onClick: () => void;
}

export default function EyeToggleBtn({ value, onClick }: EyeToggleBtnProps) {
  const onClickBtn = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <ActionIcon radius="lg" variant="subtle" color="gray" onClick={onClickBtn}>
      {value ? <IconEye /> : <IconEyeOff />}
    </ActionIcon>
  );
}
