import { create, useStore } from "zustand";
import dayjs from "@/libraries/dayjs";
import { DateValue } from "@mantine/dates";

type AdminState = {
  extnUserId: string;
  emplName: string;
  date: [DateValue, DateValue];
  nonce: number;
  resetTime: number;
  page: number;
};

type AdminActions = {
  actions: {
    setState: (newState: Partial<AdminState>) => void;
    setPage: (page: number) => void;
    refreshPage: () => void;
    reset: () => void;
    unmount: () => void;
  };
};

const initState: AdminState = {
  extnUserId: "",
  emplName: "",
  date: [dayjs().subtract(1, "day").toDate(), dayjs().toDate()],
  resetTime: Date.now(),
  nonce: 0,
  page: 1,
};

export const useAdminStore = create<AdminState & AdminActions>()((set) => ({
  ...initState,
  actions: {
    setState: (newState) => {
      set((state) => ({
        extnUserId: newState.extnUserId,
        emplName: newState.emplName,
        date: newState.date,
        nonce: state.nonce + 1,
      }));
    },
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

export const useSetAdminStore = () => useStore(useAdminStore, (store) => store.actions);
