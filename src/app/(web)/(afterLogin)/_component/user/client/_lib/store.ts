import { DateType } from "@/app/_component/datepicker/DatePicker";
import { formatInTimeZone } from "date-fns-tz";
import { create, useStore } from "zustand";

type clientState = {
  extnUserId: string;
  date: [DateType, DateType];
  resetTime: string;
  nonce: number;
};

type clientActions = {
  actions: {
    setState: (extnUserId: string, date: [DateType, DateType]) => void;
    refreshPage: () => void;
    unmount: () => void;
  };
};

const initState: clientState = {
  extnUserId: "",
  date: [null, null],
  resetTime: formatInTimeZone(new Date(), "UTC", "yyyyMMddHHmmssSSS"),
  nonce: 0,
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
    refreshPage: () => set((state) => ({ ...state, nonce: state.nonce + 1 })),
    unmount: () =>
      set(() => ({
        ...initState,
        resetTime: formatInTimeZone(new Date(), "UTC", "yyyyMMddHHmmssSSS"),
      })),
  },
}));

export const useSetClientStore = () => useStore(useClientStore, (store) => store.actions);
