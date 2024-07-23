import { DateType } from "@/app/_component/datepicker/DatePicker";
import { create, useStore } from "zustand";

type TradeHistoryState = {
  instCd: string;
  mvioTp: string;
  nonce: number;
  resetTime: number;
  page: number;
  date: [DateType, DateType];
};

type TradeHistoryActions = {
  actions: {
    setState: (newState: Partial<TradeHistoryState>) => void;
    setPage: (page: number) => void;
    reset: () => void;
    refreshPage: () => void;
    unmount: () => void;
  };
};

const initState: TradeHistoryState = {
  instCd: "",
  mvioTp: "",
  nonce: 0,
  resetTime: Date.now(),
  page: 1,
  date: [null, null],
};

export const useTradeHistoryStore = create<TradeHistoryState & TradeHistoryActions>()((set) => ({
  ...initState,
  actions: {
    setState: (newState) => {
      set((state) => ({ ...newState, nonce: state.nonce + 1 }));
    },
    setPage: (page) => set((state) => ({ page, nonce: state.nonce + 1 })),
    refreshPage: () => set((state) => ({ ...state, nonce: state.nonce + 1 })),
    reset: () =>
      set(() => ({
        ...initState,
        nonce: 1,
        resetTime: Date.now(),
      })),
    unmount: () =>
      set(() => ({
        ...initState,
        resetTime: Date.now(),
      })),
  },
}));

export const useSetTradeHistory = () => useStore(useTradeHistoryStore, (store) => store.actions);
