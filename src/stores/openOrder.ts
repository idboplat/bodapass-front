import { create, useStore } from "zustand";
import dayjs from "@/libraries/dayjs";
import { DateValue } from "@mantine/dates";

type OpenOrderState = {
  instCd: string;
  date: [DateValue, DateValue];
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
  date: [dayjs().subtract(1, "day").toDate(), dayjs().toDate()],
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
