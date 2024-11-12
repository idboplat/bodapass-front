import { create, useStore } from "zustand";
import dayjs from "@/libraries/dayjs";
import { DateValue } from "@mantine/dates";

type TransactionCorpState = {
  date: [DateValue, DateValue];
  instCd: string;
  rqstStatTp: string;
  nonce: number;
  resetTime: number;
  page: number;
};

type TransactionCorpActions = {
  actions: {
    setState: (newState: Partial<TransactionCorpState>) => void;
    refreshPage: () => void;
    setPage: (page: number) => void;
    reset: () => void;
    unmount: () => void;
  };
};

const initState: TransactionCorpState = {
  date: [dayjs().subtract(1, "day").toDate(), dayjs().toDate()],
  instCd: "",
  rqstStatTp: "",
  nonce: 0,
  resetTime: Date.now(),
  page: 1,
};

export const useTransactionCorpStore = create<TransactionCorpState & TransactionCorpActions>()(
  (set) => ({
    ...initState,
    actions: {
      setState: (newState) => set((state) => ({ ...newState, nonce: state.nonce + 1 })),
      setPage: (page) => set((state) => ({ page, nonce: state.nonce + 1 })),
      refreshPage: () => set((state) => ({ nonce: state.nonce + 1 })),
      reset: () => {
        set(() => ({
          ...initState,
          nonce: 1,
          resetTime: Date.now(),
        }));
      },
      unmount: () => {
        set(() => ({
          ...initState,
          resetTime: Date.now(),
        }));
      },
    },
  }),
);

export const useSetTransactionCorpStore = () =>
  useStore(useTransactionCorpStore, (store) => store.actions);
