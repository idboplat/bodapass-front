import { DateType } from "@web/(afterLogin)/_component/DatePicker";
import { create, useStore } from "zustand";
import { devtools } from "zustand/middleware";

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

export const useCorpStore = create<CorpState & CorpActions>()(
  devtools(
    (set) => ({
      ...initState,
      actions: {
        setDate: (date) => set(() => ({ date })),
        reset: () => set(initState),
      },
    }),
    { name: "corp", enabled: process.env.NODE_ENV === "development" },
  ),
);

export const useSetCorpStore = () => useStore(useCorpStore, (store) => store.actions);
