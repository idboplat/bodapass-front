import { DateType } from "@/components/common/datepicker/DatePicker";
import { addDays } from "date-fns";
import { create, useStore } from "zustand";

type AdminState = {
  extnUserId: string;
  emplName: string;
  date: [DateType, DateType];
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
  date: [addDays(new Date(), -1), new Date()],
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
