"use client";
import { defaultBtn } from "@/app/_component/btn/btn.css";
import { useTimerStore } from "@web/(afterLogin)/_lib/timerStore";
import { useStore } from "zustand";

export default function SessionUpdateBtn() {
  const refresh = useStore(useTimerStore, (state) => state.refresh);

  return (
    <button onClick={() => refresh()} className={defaultBtn}>
      연장하기
    </button>
  );
}
