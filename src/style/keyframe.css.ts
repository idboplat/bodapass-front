import { keyframes } from "@vanilla-extract/css";

export const fadeIn = keyframes({
  from: {
    opacity: 0,
    visibility: "hidden",
  },
  to: {
    opacity: 1,
    visibility: "visible",
  },
});
