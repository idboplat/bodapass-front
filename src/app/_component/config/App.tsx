"use client";
import { useEffect, useRef } from "react";
import { AppContext, SESSION_STORAGE_KEY, createAppStore } from "../../_lib/appStore";
import { Session } from "next-auth";
import { formatISO } from "date-fns";

interface AppProps {
  children: React.ReactNode;
  session: Session | null;
}

export default function App({ session, children }: AppProps) {
  const store = useRef(
    createAppStore({
      session: !!session ? formatISO(new Date()) : "guest",
      theme: "light",
      sidebar: true,
    }),
  );

  useEffect(() => {
    const syncStore = (e: StorageEvent) => {
      if (e.key === SESSION_STORAGE_KEY) {
        // 로그아웃시 새로고침
        const oldV = e.oldValue !== "guest";
        const newV = e.newValue === "guest";

        if (newV && oldV) {
          window.location.reload();
        }
      }
    };

    window.addEventListener("storage", syncStore);

    return () => window.removeEventListener("storage", syncStore);
  }, []);

  return <AppContext.Provider value={store.current}>{children}</AppContext.Provider>;
}
