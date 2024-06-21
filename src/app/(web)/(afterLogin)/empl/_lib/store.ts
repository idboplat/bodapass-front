import { DateType } from "@web/(afterLogin)/_component/datepicker/DatePicker";
import { create, useStore } from "zustand";

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

export const useEmplStore = create<emplState & emplActions>()((set) => ({
  ...initState,
  actions: {
    setState: (state) => set(() => ({ ...state })),
    reset: () => set(initState),
  },
}));

export const useSetEmplStore = () => useStore(useEmplStore, (store) => store.actions);
