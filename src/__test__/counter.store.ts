import { devtools } from "zustand/middleware";
import { create } from "zustand";

interface TCountState {
  count: number;
}

interface TCountAction {
  increaseCount: () => void;
  decreaseCount: () => void;
  doubleCount: () => void;
  halfCount: () => void;
}

const countStore = () => ({
  count: 0,
});

export const useCountStore = create(devtools<TCountState>(countStore, { name: "countStore" }));

export const useCountAction = (): TCountAction => ({
  increaseCount: () => {
    useCountStore.setState((state) => ({ count: state.count + 1 }));
  },
  decreaseCount: () => {
    useCountStore.setState((state) => ({ count: state.count - 1 }));
  },
  doubleCount: () => {
    useCountStore.setState((state) => ({ count: state.count * 2 }));
  },
  halfCount: () => {
    useCountStore.setState((state) => ({ count: Math.floor(state.count / 2) }));
  },
});
