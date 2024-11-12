import { create, useStore } from "zustand";
import dayjs from "@/libraries/dayjs";
import { DateValue } from "@mantine/dates";

type CorpState = {
  date: [DateValue, DateValue];
  corpNm: string;
  corpGrpTp: string;
  nonce: number;
  resetTime: number;
  page: number;
};

type CorpActions = {
  actions: {
    setState: (corpNm: string, corpGrpTp: string) => void;
    setPage: (page: number) => void;
    reset: () => void;
    refreshPage: () => void;
    unmount: () => void;
  };
};

const initState: CorpState = {
  date: [dayjs().subtract(1, "day").toDate(), dayjs().toDate()],
  corpNm: "",
  corpGrpTp: "",
  nonce: 0,
  resetTime: Date.now(),
  page: 1,
};

export const useCorpStore = create<CorpState & CorpActions>()((set) => ({
  ...initState,
  actions: {
    setState: (corpNm, corpGrpTp) => {
      set((state) => ({ corpNm, corpGrpTp, nonce: state.nonce + 1 }));
    },
    setPage: (page) => set((state) => ({ page, nonce: state.nonce + 1 })),
    refreshPage: () => set((state) => ({ ...state, nonce: state.nonce + 1 })),
    reset: () =>
      set(() => ({
        ...initState,
        nonce: 1,
        resetTime: Date.now(),
      })),
    unmount: () =>
      set(() => ({
        ...initState,
        resetTime: Date.now(),
      })),
  },
}));

export const useSetCorpStore = () => useStore(useCorpStore, (store) => store.actions);
