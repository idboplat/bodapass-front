import { PORTAL_MODAL_CONTAINER_ID } from "@/constants";
import { createPortal } from "react-dom";

interface Props {
  id?: string;
  children: React.ReactNode;
}

export default function Portal({ children, id = PORTAL_MODAL_CONTAINER_ID }: Props) {
  const container = document.getElementById(id);

  if (!container) {
    throw new Error(`Container not found: ${id}`);
  }

  return createPortal(children, container);
}
