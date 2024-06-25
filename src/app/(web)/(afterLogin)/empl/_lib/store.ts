import { DateType } from "@web/(afterLogin)/_component/datepicker/DatePicker";
import { formatInTimeZone } from "date-fns-tz";
import { create, useStore } from "zustand";

type emplState = {
  corpCode: string;
  emplId: string;
  emplName: string;
  date: [DateType, DateType];
  resetTime: string;
  nonce: number;
};

type emplActions = {
  actions: {
    setState: (id: string, name: string, date: [DateType, DateType]) => void;
    refreshPage: () => void;
    reset: () => void;
  };
};

const initState: emplState = {
  corpCode: "",
  emplId: "",
  emplName: "",
  date: [null, null],
  resetTime: formatInTimeZone(new Date(), "UTC", "yyyyMMddHHmmssSSS"),
  nonce: 0,
};

export const useEmplStore = create<emplState & emplActions>()((set) => ({
  ...initState,
  actions: {
    setState: (emplId, emplName, date) => {
      set((state) => ({
        emplId,
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
