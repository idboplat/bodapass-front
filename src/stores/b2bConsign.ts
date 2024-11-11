import { DateType } from "@/components/common/datepicker/DatePicker";
import { addDays } from "date-fns";
import { create, useStore } from "zustand";

type TransactionCorpState = {
  date: [DateType, DateType];
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
  date: [addDays(new Date(), -1), new Date()],
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
