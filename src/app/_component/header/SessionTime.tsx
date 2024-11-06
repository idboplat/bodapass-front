"use client";
import { SESSION_STORAGE_KEY, useApp } from "@/app/_lib/appStore";
import { useLogoutMutation } from "@web/(afterLogin)/_lib/useLogoutMutation";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import module from "./SessionTime.module.scss";
import { useStore } from "zustand";

const TIME = 60 * 60; // 단위 초

interface SessionTimeProps {
  session: Session;
}

export default function SessionTime({}: SessionTimeProps) {
  const [now, setNow] = useState(Date.now());
  const app = useApp();
  const appStore = useStore(app);
  const mutateLogout = useLogoutMutation();

  // loginTime이 0이되면 now로 대신 계산
  const loginTime = new Date(appStore.session).getTime() || now;
  const past = Math.floor((now - loginTime) / 1000); // 지난 초
  const remain = TIME - past; // 남은 초

  useEffect(() => {
    if (appStore.session === "guest") return;

    const timer = setTimeout(() => {
      if (remain <= 0) {
        console.log("로그아웃");
        return mutateLogout.mutate();
      }
      setNow(() => Date.now());
    }, 1000);

    return () => clearTimeout(timer);
  }, [remain, appStore.session, mutateLogout]);

  useEffect(() => {
    // 로컬스토리지 변경사항 동기화
    const syncTimer = (e: StorageEvent) => {
      if (e.key !== SESSION_STORAGE_KEY) return;
      appStore.actions.refresh(); //로컬스토리지 변경
    };
    window.addEventListener("storage", syncTimer);
    return () => window.removeEventListener("storage", syncTimer);
  }, [appStore.actions]);

  const addPad = (num: number) => num.toString().padStart(2, "0");
  const min = addPad(Math.floor(remain / 60));
  const sec = addPad(remain % 60);
  const timeFormat = `남은시간 : ${min}분 ${sec}초`;

  return (
    <>
      <span>
        <time>{timeFormat}</time>
      </span>
      <button className={module.scss} onClick={appStore.actions.refresh}>
        연장하기
      </button>
    </>
  );
}
