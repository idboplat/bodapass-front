import { create, useStore } from "zustand";
import dayjs from "@/libraries/dayjs";
import { DateValue } from "@mantine/dates";

type clientState = {
  extnUserId: string;
  date: [DateValue, DateValue];
  nonce: number;
  resetTime: number;
  page: number;
};

type clientActions = {
  actions: {
    setState: (extnUserId: string, date: [DateValue, DateValue]) => void;
    setPage: (page: number) => void;
    refreshPage: () => void;
    unmount: () => void;
  };
};

const initState: clientState = {
  extnUserId: "",
  date: [dayjs().subtract(1, "day").toDate(), dayjs().toDate()],
  nonce: 0,
  resetTime: Date.now(),
  page: 1,
};

export const useClientStore = create<clientState & clientActions>((set) => ({
  ...initState,
  actions: {
    setState: (extnUserId, date) => {
      set((state) => ({
        extnUserId,
        date,
        nonce: state.nonce + 1,
      }));
    },
    setPage: (page) => set((state) => ({ page, nonce: state.nonce + 1 })),
    refreshPage: () => set((state) => ({ ...state, nonce: state.nonce + 1 })),
    unmount: () =>
      set(() => ({
        ...initState,
        resetTime: Date.now(),
      })),
  },
}));

export const useSetClientStore = () => useStore(useClientStore, (store) => store.actions);
