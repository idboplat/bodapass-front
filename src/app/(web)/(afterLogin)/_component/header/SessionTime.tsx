"use client";
import { useTimerStore } from "@web/(afterLogin)/_lib/timerStore";
import { useLogoutMutation } from "@web/(afterLogin)/_lib/useLogoutMutation";
import { Session } from "next-auth";
import { useEffect, useState } from "react";

const Time = 3600;

interface SessionTimeProps {
  session: Session;
}

export default function SessionTime({}: SessionTimeProps) {
  const [remain, setRemain] = useState(Time);
  const store = useTimerStore();

  const mutateLogout = useLogoutMutation();

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
    const syncTimer = () => setRemain(() => Time);
    syncTimer();
    window.addEventListener("storage", syncTimer);
    return () => window.removeEventListener("storage", syncTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.time]);

  const addPad = (num: number) => num.toString().padStart(2, "0");
  const min = addPad(Math.floor(remain / 60));
  const sec = addPad(remain % 60);
  const timeFormat = `남은시간 : ${min}분 ${sec}초`;

  return (
    <span className="sessionTime">
      <time>{timeFormat}</time>
    </span>
  );
}
