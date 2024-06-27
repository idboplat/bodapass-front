import { DateType } from "@/app/_component/datepicker/DatePicker";
import { form } from "@web/(beforeLogin)/login/_component/loginForm.css";
import { formatInTimeZone } from "date-fns-tz";
import { create, useStore } from "zustand";

type CoinState = {
  date: [DateType, DateType];
  mvioTp: string;
  nonce: number;
  resetTime: string;
};

type CoinActions = {
  actions: {
    setState: (mvioTp: string) => void;
    reset: () => void;
    refreshPage: () => void;
  };
};

const initState: CoinState = {
  date: [null, null],
  mvioTp: "",
  nonce: 0,
  resetTime: formatInTimeZone(new Date(), "UTC", "yyyyMMddHHmmssSSS"),
};

export const useCoinStore = create<CoinState & CoinActions>()((set) => ({
  ...initState,
  actions: {
    setState: (mvioTp) => set((state) => ({ mvioTp, nonce: state.nonce + 1 })),
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

export const useSetCoinStore = () => useStore(useCoinStore, (store) => store.actions);
