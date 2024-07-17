import { DateType } from "@/app/_component/datepicker/DatePicker";
import { create, useStore } from "zustand";

type TransactionClientState = {
  date: [DateType, DateType];
  instCd: string;
  mvioTp: string;
  mvioRmrkTp: string;
  rqstStatTp: string;
  nonce: number;
  resetTime: number;
  page: number;
};

type TransactionClientActions = {
  actions: {
    setState: (newStae: Partial<TransactionClientState>) => void;
    refreshPage: () => void;
    setPage: (page: number) => void;
    reset: () => void;
    unmount: () => void;
  };
};

const initState: TransactionClientState = {
  date: [null, null],
  instCd: "",
  mvioTp: "",
  mvioRmrkTp: "",
  rqstStatTp: "",
  nonce: 0,
  resetTime: Date.now(),
  page: 1,
};

export const useTransactionClientStore = create<
  TransactionClientState & TransactionClientActions
>()((set) => ({
  ...initState,
  actions: {
    setState: (newState) => set((state) => ({ ...newState, nonce: state.nonce + 1 })),
    setPage: (page) => set((state) => ({ page, nonce: state.nonce + 1 })),
    refreshPage: () => set((state) => ({ ...state, nonce: state.nonce + 1 })),
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
}));

export const useSetTransactionClientStore = () =>
  useStore(useTransactionClientStore, (store) => store.actions);
