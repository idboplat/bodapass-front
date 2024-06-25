import { CORP_GRP_TP } from "@/type/common";
import { DateType } from "@web/(afterLogin)/_component/datepicker/DatePicker";
import { create, useStore } from "zustand";

type CorpState = {
  date: [DateType, DateType];
  corpNm: string;
  corpGrpTp: CORP_GRP_TP | null;
};

type CorpActions = {
  actions: {
    setState: (state: Partial<CorpState>) => void;
    reset: () => void;
  };
};

const initState: CorpState = {
  date: [null, null],
  corpNm: "",
  corpGrpTp: null,
};

export const useCorpStore = create<CorpState & CorpActions>()((set) => ({
  ...initState,
  actions: {
    setState: (state) => set(() => ({ ...state })),
    reset: () => set(initState),
  },
}));

export const useSetCorpStore = () => useStore(useCorpStore, (store) => store.actions);
