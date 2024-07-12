import { HiOutlineClipboardDocument, HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import { toast } from "sonner";
import { btn } from "./copyBtn.css";

interface CopyButtonProps {
  /** 복사할 컨텐츠 */
  text: string;
  onClick?: () => void;
  size?: number;
  style?: React.CSSProperties;
  check?: boolean;
  disabled?: boolean;
}

export default function CopyButton({
  text,
  style,
  size = 14,
  onClick,
  check,
  disabled,
}: CopyButtonProps) {
  const handleCopy = () => {
    window.navigator.clipboard.writeText(text).then(() => {
      toast.success("복사 되었습니다.");
      onClick && onClick();
    });
  };

  return (
    <button className={btn} onClick={handleCopy} style={style} disabled={disabled}>
      {check ? (
        <HiOutlineClipboardDocumentCheck size={size} />
      ) : (
        <HiOutlineClipboardDocument size={size} />
      )}
    </button>
  );
}
