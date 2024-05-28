//모달 랜더링 상태를 선언하기 위한 컴포넌트
"use client";
import ModalContext, { modalRenderAtom } from "@/model/modal/modalContext";
import ModalController from "@/model/modal/modalController";
import { useAtom } from "jotai";
import { PropsWithChildren, useState } from "react";

export default function ModalProvider({ children }: PropsWithChildren) {
  const renderState = useAtom(modalRenderAtom);
  const [modalController] = useState(() => new ModalController(renderState));

  return (
    <ModalContext.Provider value={modalController}>
      <> {children}</>
    </ModalContext.Provider>
  );
}
