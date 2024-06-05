import { formatISO } from "date-fns";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type State = {
  time: string; //seconds
};

type Action = {
  refresh: () => void;
};

const initState: State = {
  time: formatISO(new Date()),
};

export const TIMER_STORAGE_KEY = "timer-session";

export const useTimerStore = create<State & Action>()(
  devtools(
    persist(
      (set) => ({
        ...initState,
        refresh: () => {
          set(() => ({ time: formatISO(new Date()) }));
        },
      }),
      { name: TIMER_STORAGE_KEY },
    ),
  ),
);
