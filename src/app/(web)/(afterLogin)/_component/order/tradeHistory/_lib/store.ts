import { DateType } from "@/app/_component/datepicker/DatePicker";
import { addDays } from "date-fns";
import { create, useStore } from "zustand";

type OrderHistoryState = {
  instCd: string;
  mvioTp: string;
  nonce: number;
  resetTime: number;
  page: number;
  date: [DateType, DateType];
};

type OrderHistoryActions = {
  actions: {
    setState: (newState: Partial<OrderHistoryState>) => void;
    setPage: (page: number) => void;
    reset: () => void;
    refreshPage: () => void;
    unmount: () => void;
  };
};

const initState: OrderHistoryState = {
  instCd: "",
  mvioTp: "",
  nonce: 0,
  resetTime: Date.now(),
  page: 1,
  date: [addDays(new Date(), -1), new Date()],
};

export const useOrderHistoryStore = create<OrderHistoryState & OrderHistoryActions>()((set) => ({
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

export const useSetOrderHistory = () => useStore(useOrderHistoryStore, (store) => store.actions);
