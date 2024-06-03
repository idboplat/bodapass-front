import { atomWithReset } from "jotai/utils";

export const isSidebarToggleAtom = atomWithReset(true);

if (process.env.NODE_ENV === "development") {
  isSidebarToggleAtom.debugLabel = "isSidebarToggleAtom";
}
