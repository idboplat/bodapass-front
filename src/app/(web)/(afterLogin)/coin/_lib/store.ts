import { DateType } from "@web/(afterLogin)/_component/DatePicker";
import { create, useStore } from "zustand";
import { devtools } from "zustand/middleware";

type CoinState = {
  date: [DateType, DateType];
};

type CoinActions = {
  actions: {
    setDate: (date: [DateType, DateType]) => void;
    reset: () => void;
  };
};

const initState: CoinState = {
  date: [null, null],
};

export const useCoinStore = create<CoinState & CoinActions>()(
  devtools(
    (set) => ({
      ...initState,
      actions: {
        setDate: (date) => set(() => ({ date })),
        reset: () => set(initState),
      },
    }),
    { name: "coin", enabled: process.env.NODE_ENV === "development" },
  ),
);

export const useSetCoinStore = () => useStore(useCoinStore, (store) => store.actions);
