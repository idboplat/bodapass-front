import { DateType } from "@web/(afterLogin)/_component/datepicker/DatePicker";
import { create, useStore } from "zustand";

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

export const useCoinStore = create<CoinState & CoinActions>()((set) => ({
  ...initState,
  actions: {
    setDate: (date) => set(() => ({ date })),
    reset: () => set(initState),
  },
}));

export const useSetCoinStore = () => useStore(useCoinStore, (store) => store.actions);
