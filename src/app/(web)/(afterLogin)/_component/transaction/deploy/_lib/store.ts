import { DateType } from "@/app/_component/datepicker/DatePicker";
import { create, useStore } from "zustand";

export type CoinState = {
  date: [DateType, DateType];
  mvioTp: string;
  nonce: number;
  resetTime: number;
  page: number;
};

type CoinActions = {
  actions: {
    setState: (newState: { date: [DateType, DateType] }) => void;
    setPage: (page: number) => void;
    reset: () => void;
    refreshPage: () => void;
    unmount: () => void;
  };
};

const initState: CoinState = {
  date: [null, null],
  mvioTp: "",
  nonce: 0,
  resetTime: Date.now(),
  page: 1,
};

export const useCoinStore = create<CoinState & CoinActions>()((set) => ({
  ...initState,
  actions: {
    setState: (newState) => set((state) => ({ ...newState, nonce: state.nonce + 1 })),
    setPage: (page) => set((state) => ({ page, nonce: state.nonce + 1 })),
    refreshPage: () => set((state) => ({ ...state, nonce: state.nonce + 1 })),
    reset: () => {
      set(() => ({
        ...initState,
        nonce: 1,
        resetTime: Date.now(),
      }));
    },
    unmount: () =>
      set(() => ({
        ...initState,
        resetTime: Date.now(),
      })),
  },
}));

export const useSetCoinStore = () => useStore(useCoinStore, (store) => store.actions);
