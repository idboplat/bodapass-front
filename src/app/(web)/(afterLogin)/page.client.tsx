"use client";
import { defaultBtn } from "@/app/_component/btn/btn.css";
import { useSetModalStore } from "@/app/_lib/modalStore";
import { Session } from "next-auth";
import CreateCorpModal from "./corp/_component/CreateCorpModal";

export default function Client() {
  const action = useSetModalStore();

  const onClick = () => {
    action.push(CreateCorpModal);
  };

  return (
    <div>
      <div>모달</div>
      <div>
        <button className={defaultBtn} onClick={onClick}>
          모달 열기
        </button>
      </div>
    </div>
  );
}
