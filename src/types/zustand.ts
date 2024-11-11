type ExtractState<S> = S extends {
  getState: () => infer T;
}
  ? T
  : never;

export type Selector<T, U> = (state: ExtractState<T>) => U;
