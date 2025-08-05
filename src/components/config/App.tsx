import { useRef } from "react";
import { AppContext, createAppStore, SESSION_STORAGE_KEY } from "@/stores/app";

interface AppProps {
  children: React.ReactNode;
}

export default function App({ children }: AppProps) {
  const store = useRef(createAppStore({ session: null }));

  // useEffect(() => {
  //   const syncStore = (e: StorageEvent) => {
  //     if (e.key === SESSION_STORAGE_KEY) {
  //       // 로그아웃시 새로고침
  //       const oldV = e.oldValue !== "guest";
  //       const newV = e.newValue === "guest";

  //       if (newV && oldV) {
  //         window.location.reload();
  //       }
  //     }
  //   };

  //   window.addEventListener("storage", syncStore);

  //   return () => window.removeEventListener("storage", syncStore);
  // }, []);

  return <AppContext.Provider value={store.current}>{children}</AppContext.Provider>;
}
