import { DateType } from "@/app/_component/datepicker/DatePicker";
import { addDays } from "date-fns";
import { create, useStore } from "zustand";

type adminState = {
  emplId: string;
  extnUserId: string;
  emplName: string;
  date: [DateType, DateType];
  nonce: number;
  resetTime: number;
  page: number;
};

type adminActions = {
  actions: {
    setState: (
      emplId: string,
      extnUserId: string,
      emplName: string,
      date: [DateType, DateType],
    ) => void;
    setPage: (page: number) => void;
    refreshPage: () => void;
    reset: () => void;
    unmount: () => void;
  };
};

const initState: adminState = {
  emplId: "",
  extnUserId: "",
  emplName: "",
  date: [addDays(new Date(), -1), new Date()],
  resetTime: Date.now(),
  nonce: 0,
  page: 1,
};

export const useAdminStore = create<adminState & adminActions>()((set) => ({
  ...initState,
  actions: {
    setState: (emplId, extnUserId, emplName, date) => {
      set((state) => ({
        emplId,
        extnUserId,
        emplName,
        date,
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
