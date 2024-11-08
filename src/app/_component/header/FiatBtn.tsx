"use client";
import { useApp } from "@/app/_lib/appStore";
import { useStore } from "zustand";
import { RiExchangeDollarLine } from "react-icons/ri";
import css from "./FiatBtn.module.scss";
import { useSetModalStore } from "@/app/_lib/modalStore";
import FiatSettingModal from "./FiatSettingModal";

export default function FiatButton() {
  const app = useApp();
  const fiat = useStore(app, (store) => store.fiat);
  const action = useStore(app, (store) => store.actions);
  const modalStore = useSetModalStore();

  const onClick = async () => {
    const result: undefined | string = await modalStore.push(FiatSettingModal);

    if (result) {
      action.setFiat(result);
    }
  };

  return (
    <button className={css.btn} onClick={onClick}>
      <RiExchangeDollarLine size="20px" />
      <span>{fiat}</span>
    </button>
  );
}
