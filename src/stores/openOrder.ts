import { DateType } from "@/components/common/datepicker/DatePicker";
import { addDays } from "date-fns";
import { create, useStore } from "zustand";

type OpenOrderState = {
  instCd: string;
  date: [DateType, DateType];
  byslTp: string;
  nonce: number;
  resetTime: number;
  page: number;
};

type OpenOrderActions = {
  actions: {
    setState: (newState: Partial<OpenOrderState>) => void;
    setPage: (page: number) => void;
    reset: () => void;
    refreshPage: () => void;
    unmount: () => void;
  };
};

const initState: OpenOrderState = {
  instCd: "",
  byslTp: "",
  nonce: 0,
  resetTime: Date.now(),
  page: 1,
  date: [addDays(new Date(), -1), new Date()],
};

export const useOpenOrderStore = create<OpenOrderState & OpenOrderActions>()((set) => ({
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

export const useSetOpenOrderStore = () => useStore(useOpenOrderStore, (store) => store.actions);
