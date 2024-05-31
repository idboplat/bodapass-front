"use client";
import useModalStore from "@/hook/useModalStore";
import { modalRenderAtom } from "@/model/modal/modalContext";
import { useAtom } from "jotai";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const MODAL_ID = "modalRoot";

export default function ModalContainer() {
  useAtom(modalRenderAtom);
  const modalStore = useModalStore();
  const isEmpty = modalStore.length === 0;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    //modal-root가 없으면 body에 modal-root를 만들어준다.
    const modalBox = document.createElement("div");
    modalBox.id = MODAL_ID;
    document.body.appendChild(modalBox);
    containerRef.current = modalBox;
    return () => {
      modalStore.clear();
      modalBox.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    modalStore.clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (isEmpty || !containerRef.current) return null;

  return createPortal(
    <>
      {modalStore.all.map((modalInfo) => (
        <modalInfo.Component key={modalInfo.key} {...modalInfo.props} />
      ))}
    </>,
    containerRef.current,
  );
}
