"use client";
import { useModalStore } from "@/stores/modal";
import { useEffect } from "react";
import { ASYNC_MODAL_CONTAINER_ID } from "@/constants";
import css from "./ModalContainer.module.scss";
import { clsx } from "clsx";
import { usePathname } from "next/navigation";

export default function AsyncModalContainer() {
  const store = useModalStore();
  const pathname = usePathname();

  useEffect(() => {
    store.actions.closeAll();
  }, [pathname, store.actions]);

  return (
    <div
      id={ASYNC_MODAL_CONTAINER_ID}
      className={clsx(css.modalContainer, {
        active: store.modals.length > 0,
      })}
    >
      {store.modals.map((modal) => (
        <modal.Component key={modal.key} {...modal.props} />
      ))}
    </div>
  );
}
