import { DateType } from "@web/(afterLogin)/_component/datepicker/DatePicker";
import { create, useStore } from "zustand";

type CorpState = {
  date: [DateType, DateType];
};

type CorpActions = {
  actions: {
    setDate: (date: [DateType, DateType]) => void;
    reset: () => void;
  };
};

const initState: CorpState = {
  date: [null, null],
};

export const useCorpStore = create<CorpState & CorpActions>()((set) => ({
  ...initState,
  actions: {
    setDate: (date) => set(() => ({ date })),
    reset: () => set(initState),
  },
}));

export const useSetCorpStore = () => useStore(useCorpStore, (store) => store.actions);
