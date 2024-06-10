import { DateType } from "@web/(afterLogin)/_component/DatePicker";
import { create, useStore } from "zustand";
import { devtools } from "zustand/middleware";

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

export const useTransactionStore = create<TransactionState & TransactionActions>()(
  devtools(
    (set) => ({
      ...initState,
      actions: {
        setDate: (date) => set(() => ({ date })),
        reset: () => set(initState),
      },
    }),
    { name: "transaction", enabled: process.env.NODE_ENV === "development" },
  ),
);

export const useSetTransactionStore = () => useStore(useTransactionStore, (store) => store.actions);
