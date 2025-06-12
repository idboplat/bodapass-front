import { ActionIcon } from "@mantine/core";
import { Eye, EyeOff } from "lucide-react";

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
      {value ? <Eye /> : <EyeOff />}
    </ActionIcon>
  );
}
