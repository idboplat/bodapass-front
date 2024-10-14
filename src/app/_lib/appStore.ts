import { formatISO } from "date-fns";
import { createContext, useContext } from "react";
import { createStore, useStore } from "zustand";

export const SESSION_STORAGE_KEY = "auth-session";

type State = {
  session: string;
  theme: "light" | "dark";
  fiat: string;
  sidebar: boolean;
};

type Action = {
  actions: {
    logout: () => void;
    login: () => void;
    refresh: () => void;
    toggleSidebar: () => void;
    setFiat: (string: string) => void;
  };
};

type AppStore = ReturnType<typeof createAppStore>;

export const createAppStore = (initState: State) => {
  if (typeof window !== "undefined") {
    // 쿠키와 로컬스토리지의 세션 정보를 동기화
    localStorage.setItem(SESSION_STORAGE_KEY, initState.session);
  }

  return createStore<State & Action>((set, get) => ({
    ...initState,
    actions: {
      login: () => {
        const session = formatISO(new Date());
        localStorage.setItem(SESSION_STORAGE_KEY, session);
        set(() => ({ session }));
      },
      logout: () => {
        localStorage.setItem(SESSION_STORAGE_KEY, "guest");
        set(() => ({ session: "guest" }));
      },
      refresh: () => get().actions.login(),
      toggleSidebar: () =>
        set((pre) => {
          const maxAge = 60 * 60 * 24 * 365; // 1년
          document.cookie = `sidebar=${!pre.sidebar}; Max-Age=${maxAge} Path=/;`;
          return { sidebar: !pre.sidebar };
        }),
      setFiat: (newFiat) =>
        set(() => {
          const fiat = newFiat === "KRW" ? "KRW" : "USD";
          document.cookie = `fiat=${fiat}; Max-Age=${60 * 60 * 24 * 365} Path=/;`;
          return { fiat };
        }),
    },
  }));
};

export const AppContext = createContext<AppStore | null>(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within a AppProvider");
  return context;
};

export const useSetApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useSetApp must be used within a AppProvider");
  return useStore(context, (store) => store.actions);
};
