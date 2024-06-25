import { DateType } from "@web/(afterLogin)/_component/datepicker/DatePicker";
import { format } from "date-fns";
import { create, useStore } from "zustand";

type TransactionState = {
  date: [DateType, DateType];
  mvioDd: string;
  instCd: string;
  mvioTp: string;
  mvioRmrkTp: string;
  rqstStatTp: string;
};

type TransactionActions = {
  actions: {
    setState: (state: Partial<TransactionState>) => void;
    reset: () => void;
  };
};

const initState: TransactionState = {
  date: [null, null],
  mvioDd: format(new Date(), "yyyyMMdd"),
  instCd: "",
  mvioTp: "",
  mvioRmrkTp: "",
  rqstStatTp: "",
};

export const useTransactionStore = create<TransactionState & TransactionActions>()((set) => ({
  ...initState,
  actions: {
    setState: (state) => set(() => ({ ...state })),
    reset: () => set(initState),
  },
}));

export const useSetTransactionStore = () => useStore(useTransactionStore, (store) => store.actions);
