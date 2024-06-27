import { DateType } from "@/app/_component/datepicker/DatePicker";
import { formatInTimeZone } from "date-fns-tz";
import { create, useStore } from "zustand";

type CorpState = {
  date: [DateType, DateType];
  corpNm: string;
  corpGrpTp: string | null;
  nonce: number;
  resetTime: string;
};

type CorpActions = {
  actions: {
    setState: (corpNm: string, corpGrpTp: string) => void;
    reset: () => void;
    refreshPage: () => void;
  };
};

const initState: CorpState = {
  date: [null, null],
  corpNm: "",
  corpGrpTp: null,
  nonce: 0,
  resetTime: formatInTimeZone(new Date(), "UTC", "yyyyMMddHHmmssSSS"),
};

export const useCorpStore = create<CorpState & CorpActions>()((set) => ({
  ...initState,
  actions: {
    setState: (corpNm, corpGrpTp) => {
      set((state) => ({ corpNm, corpGrpTp, nonce: state.nonce + 1 }));
    },
    refreshPage: () => set((state) => ({ ...state, nonce: state.nonce + 1 })),
    reset: () =>
      set(() => ({
        ...initState,
        nonce: 1,
        resetTime: formatInTimeZone(new Date(), "UTC", "yyyyMMddHHmmssSSS"),
      })),
  },
}));

export const useSetCorpStore = () => useStore(useCorpStore, (store) => store.actions);
