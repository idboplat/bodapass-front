import { createContext, useContext } from "react";
import { createStore, useStore } from "zustand";
import dayjs from "@/libraries/dayjs";

export type TAppState = {};

export type TAppAction = {};

export type TAppStore = TAppState & { actions: TAppAction };

export const createAppStore = (initState: TAppState) => {
  return createStore<TAppStore>((set, get) => ({
    ...initState,
    actions: {},
  }));
};

export const AppContext = createContext<ReturnType<typeof createAppStore> | null>(null);

export const useAppCtx = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within a AppProvider");
  return context;
};

export function useApp(): TAppStore;
export function useApp<U>(selector: (state: TAppStore) => U): U;
export function useApp<U>(selector?: (state: TAppStore) => U) {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within a AppProvider");
  return useStore(context, selector!);
}
