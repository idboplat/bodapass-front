import { DateType } from "@/app/_component/datepicker/DatePicker";
import { formatInTimeZone } from "date-fns-tz";
import { create, useStore } from "zustand";

type PnlState = {
  mvioDd: DateType;
  instCd: string;
  mvioTp: string;
  nonce: number;
  resetTime: string;
};

type PnlActions = {
  actions: {
    setState: (state: { mvioDd: DateType; instCd: string; mvioTp: string }) => void;
    reset: () => void;
    refreshPage: () => void;
    unmount: () => void;
  };
};

const initState: PnlState = {
  mvioDd: null,
  instCd: "",
  mvioTp: "",
  nonce: 0,
  resetTime: formatInTimeZone(new Date(), "UTC", "yyyyMMddHHmmssSSS"),
};

export const usePnlStore = create<PnlState & PnlActions>()((set) => ({
  ...initState,
  actions: {
    setState: (newState) => {
      set((state) => ({ ...newState, nonce: state.nonce + 1 }));
    },
    refreshPage: () => set((state) => ({ ...state, nonce: state.nonce + 1 })),
    reset: () =>
      set(() => ({
        ...initState,
        nonce: 1,
        resetTime: formatInTimeZone(new Date(), "UTC", "yyyyMMddHHmmssSSS"),
      })),
    unmount: () =>
      set(() => ({
        ...initState,
        resetTime: formatInTimeZone(new Date(), "UTC", "yyyyMMddHHmmssSSS"),
      })),
  },
}));

export const usePnlCorpStore = () => useStore(usePnlStore, (store) => store.actions);
