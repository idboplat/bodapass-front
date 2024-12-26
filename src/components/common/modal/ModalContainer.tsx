"use client";
import { useModalStore } from "@/stores/modal";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const MODAL_ID = "modalRoot";

export default function ModalContainer() {
  const store = useModalStore();
  const pathname = usePathname();

  useEffect(() => {
    return () =>{
      store.actions.closeAll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div id={MODAL_ID}>
      {store.modals.map((modalInfo) => (
        <modalInfo.Component key={modalInfo.key} {...modalInfo.props} />
      ))}
    </div>
  )
}
