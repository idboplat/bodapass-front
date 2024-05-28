// contextApi를 선언하기 위한 코드
import { createContext } from "react";
import ModalController from "./modalController";
import { atom } from "jotai";

const ModalContext = createContext<ModalController | null>(null);

export const modalRenderAtom = atom(1);

export default ModalContext;

if (process.env.NODE_ENV === "development") {
  modalRenderAtom.debugLabel = "modalRenderAtom";
}
