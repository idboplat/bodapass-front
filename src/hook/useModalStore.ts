//contextApi를 사용하기 위한 hook
import { useContext } from "react";
import ModalContext from "@/model/modal/modalContext";

export default function useModalStore() {
  const context = useContext(ModalContext);
  if (!context) throw new Error("Need to register ModalProvider");
  return context;
}
