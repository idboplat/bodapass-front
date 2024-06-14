"use client";
import { defaultBtn } from "@/app/_component/btn/btn.css";
import { useSetApp } from "@/app/_lib/app";

export default function SessionUpdateBtn() {
  const actions = useSetApp();

  return (
    <button onClick={() => actions.refresh()} className={defaultBtn}>
      연장하기
    </button>
  );
}
