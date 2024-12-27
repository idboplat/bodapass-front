"use client";
import { useEffect, useRef } from "react";
import { AppContext, createAppStore, SESSION_STORAGE_KEY } from "@/stores/app";
import { Session } from "next-auth";
import dayjs from "@/libraries/dayjs";

interface AppProps {
  children: React.ReactNode;
  session: Session | null;
  sidebar: boolean;
  fiat: string;
}

export default function App({ session, sidebar, children, fiat }: AppProps) {
  const store = useRef(
    createAppStore({
      session: !!session ? dayjs().toISOString() : "guest",
      theme: "light",
      sidebar,
      fiat,
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
