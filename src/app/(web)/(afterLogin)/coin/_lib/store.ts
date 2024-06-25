import { DateType } from "@web/(afterLogin)/_component/datepicker/DatePicker";
import { create, useStore } from "zustand";

type CoinState = {
  date: [DateType, DateType];
  mvioTp: string;
};

type CoinActions = {
  actions: {
    setState: (state: Partial<CoinState>) => void;
    reset: () => void;
  };
};

const initState: CoinState = {
  date: [null, null],
  mvioTp: "",
};

export const useCoinStore = create<CoinState & CoinActions>()((set) => ({
  ...initState,
  actions: {
    setState: (state) => set(() => ({ ...state })),
    reset: () => set(initState),
  },
}));

export const useSetCoinStore = () => useStore(useCoinStore, (store) => store.actions);
