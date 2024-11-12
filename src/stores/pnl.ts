import { create, useStore } from "zustand";
import dayjs from "@/libraries/dayjs";
import { DateValue } from "@mantine/dates";

type PnlState = {
  instCd: string;
  mvioTp: string;
  nonce: number;
  resetTime: number;
  page: number;
  date: [DateValue, DateValue];
};

type PnlActions = {
  actions: {
    setState: (newState: Partial<PnlState>) => void;
    setPage: (page: number) => void;
    reset: () => void;
    refreshPage: () => void;
    unmount: () => void;
  };
};

const initState: PnlState = {
  instCd: "",
  mvioTp: "",
  nonce: 0,
  resetTime: Date.now(),
  page: 1,
  date: [dayjs().subtract(1, "day").toDate(), dayjs().toDate()],
};

export const usePnlStore = create<PnlState & PnlActions>()((set) => ({
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

export const usePnlCorpStore = () => useStore(usePnlStore, (store) => store.actions);
