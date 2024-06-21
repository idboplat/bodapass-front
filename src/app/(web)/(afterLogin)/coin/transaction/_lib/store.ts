import { DateType } from "@web/(afterLogin)/_component/datepicker/DatePicker";
import { create, useStore } from "zustand";

type TransactionState = {
  date: [DateType, DateType];
};

type TransactionActions = {
  actions: {
    setDate: (date: [DateType, DateType]) => void;
    reset: () => void;
  };
};

const initState: TransactionState = {
  date: [null, null],
};

export const useTransactionStore = create<TransactionState & TransactionActions>()((set) => ({
  ...initState,
  actions: {
    setDate: (date) => set(() => ({ date })),
    reset: () => set(initState),
  },
}));

export const useSetTransactionStore = () => useStore(useTransactionStore, (store) => store.actions);
