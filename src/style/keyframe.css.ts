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

export const placeholderShimmer = keyframes({
  "0%": {
    backgroundPosition: "-468px 0",
  },
  "100%": {
    backgroundPosition: "468px 0",
  },
});

export const openMenu = keyframes({
  "0%": {
    opacity: 0,
    transform: "translateY(-4px)",
  },
  "100%": {
    opacity: 1,
    transform: "translateY(0)",
  },
});

export const openModal = keyframes({
  "0%": {
    opacity: 0,
    transform: "translateY(28px)",
  },
  "100%": {
    opacity: 1,
    transform: "translateY(0)",
  },
});
