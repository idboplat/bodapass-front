"use client";
import { useEffect, useState } from "react";
import { Session } from "next-auth";
import { remainTime } from "@/app/_lib/remainTime";
import { useLogoutMutation } from "@web/(afterLogin)/_lib/useLogoutMutation";

interface SessionTimeProps {
  session: Session;
}

export default function SessionTime({ session }: SessionTimeProps) {
  const [remain, setRemain] = useState(() => remainTime(session.user.exp));

  const mutateLogout = useLogoutMutation();

  useEffect(() => {
    if (remain < 0) return;
    if (remain === 0) {
      return mutateLogout.mutate();
    }

    const interval = setInterval(() => {
      setRemain((prev) => (prev > -1 ? prev - 1 : -1));
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remain]);

  useEffect(() => {
    // 세션연장시 초기화
    setRemain(() => remainTime(session.user.exp));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const min = Math.floor(remain / 60);
  const sec = remain % 60;

  return (
    <span className="sessionTime">
      남은 시간:{" "}
      <time>
        {min}분 {sec}초
      </time>
    </span>
  );
}
