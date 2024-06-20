"use client";
import { SESSION_STORAGE_KEY, useSetApp } from "@/app/_lib/app";
import { useLogoutMutation } from "@web/(afterLogin)/_lib/useLogoutMutation";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { btn } from "./sessionTime.css";

const Time = 3600;

interface SessionTimeProps {
  session: Session;
}

export default function SessionTime({}: SessionTimeProps) {
  const [remain, setRemain] = useState(Time);
  const actions = useSetApp();

  const mutateLogout = useLogoutMutation();

  const resetTime = () => {
    setRemain(() => Time);
    actions.refresh(); //로컬스토리지 변경
  };

  useEffect(() => {
    if (remain < 0) return;
    if (remain === 0) {
      return mutateLogout.mutate();
    }

    const interval = setInterval(() => {
      setRemain((pre) => (pre > -1 ? pre - 1 : -1));
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remain]);

  useEffect(() => {
    const syncTimer = (e: StorageEvent) => {
      if (e.key !== SESSION_STORAGE_KEY) return;
      setRemain(() => Time);
    };
    window.addEventListener("storage", syncTimer);
    return () => window.removeEventListener("storage", syncTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addPad = (num: number) => num.toString().padStart(2, "0");
  const min = addPad(Math.floor(remain / 60));
  const sec = addPad(remain % 60);
  const timeFormat = `남은시간 : ${min}분 ${sec}초`;

  return (
    <>
      <span>
        <time>{timeFormat}</time>
      </span>
      <button className={btn} onClick={resetTime}>
        연장하기
      </button>
    </>
  );
}
