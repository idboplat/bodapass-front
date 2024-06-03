import { createContext, useContext } from "react";
import { createStore } from "zustand";

export const SESSION_STORAGE_KEY = "auth-session";

type State = {
  session: "guest" | "user";
};

type Action = {
  actions: {
    logout: () => void;
    login: () => void;
  };
};

type AppStore = ReturnType<typeof createAppStore>;

export const createAppStore = (initState: State) => {
  if (typeof window !== "undefined") {
    // 쿠키와 로컬스토리지의 세션 정보를 동기화
    localStorage.setItem(SESSION_STORAGE_KEY, initState.session);
  }

  return createStore<State & Action>((set) => ({
    ...initState,
    actions: {
      login: () => {
        localStorage.setItem(SESSION_STORAGE_KEY, "user");
        set({ session: "user" });
      },
      logout: () => {
        localStorage.setItem(SESSION_STORAGE_KEY, "guest");
        set({ session: "guest" });
      },
    },
  }));
};

export const AppContext = createContext<AppStore | null>(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within a AppProvider");
  return context;
};
