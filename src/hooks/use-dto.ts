import { Context, createContext, Usable, use } from "react";

export const DtoContext = createContext<any | null>(null);

export function useDto<T>(): T;
export function useDto<T, U>(selector?: (dto: T) => U): U;
export function useDto<T, U>(selector?: (dto: T) => U) {
  const dto = use<T>(DtoContext);
  if (!dto) throw new Error("Not provided dto context");
  return selector ? selector(dto) : dto;
}
