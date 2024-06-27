import { DateType } from "@/app/_component/datepicker/DatePicker";
import { formatInTimeZone } from "date-fns-tz";
import { create, useStore } from "zustand";

type emplState = {
  emplId: string;
  extnUserId: string;
  emplName: string;
  date: [DateType, DateType];
  resetTime: string;
  nonce: number;
};

type emplActions = {
  actions: {
    setState: (
      emplId: string,
      extnUserId: string,
      emplName: string,
      date: [DateType, DateType],
    ) => void;
    refreshPage: () => void;
    reset: () => void;
  };
};

const initState: emplState = {
  emplId: "",
  extnUserId: "",
  emplName: "",
  date: [null, null],
  resetTime: formatInTimeZone(new Date(), "UTC", "yyyyMMddHHmmssSSS"),
  nonce: 0,
};

export const useEmplStore = create<emplState & emplActions>()((set) => ({
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
    refreshPage: () => set((state) => ({ ...state, nonce: state.nonce + 1 })),
    reset: () => {
      set(() => ({
        ...initState,
        nonce: 1,
        resetTime: formatInTimeZone(new Date(), "UTC", "yyyyMMddHHmmssSSS"),
      }));
    },
  },
}));

export const useSetEmplStore = () => useStore(useEmplStore, (store) => store.actions);
