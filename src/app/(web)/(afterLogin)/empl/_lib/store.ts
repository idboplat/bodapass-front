import { DateType } from "@web/(afterLogin)/_component/DatePicker";
import { create, useStore } from "zustand";
import { devtools } from "zustand/middleware";

type emplState = {
  corpCode: string;
  emplID: string;
  emplName: string;
  date: [DateType, DateType];
};

type emplActions = {
  actions: {
    setState: (state: Partial<emplState>) => void;
    reset: () => void;
  };
};

const initState: emplState = {
  corpCode: "",
  emplID: "",
  emplName: "",
  date: [null, null],
};

export const useEmplStore = create<emplState & emplActions>()(
  devtools(
    (set) => ({
      ...initState,
      actions: {
        setState: (state) => set(() => ({ ...state })),
        reset: () => set(initState),
      },
    }),
    { name: "empl", enabled: process.env.NODE_ENV === "development" },
  ),
);

export const useSetEmplStore = () => useStore(useEmplStore, (store) => store.actions);
