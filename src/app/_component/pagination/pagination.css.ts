import { flexCenter } from "@/style/var";
import { style } from "@vanilla-extract/css";

export const wrap = style([
  flexCenter,
  {
    gap: 14,
    margin: "7px 0",
  },
]);

export const page = style({
  fontWeight: 500,
});

export const arrowBtn = style({
  color: "#555555",
  selectors: {
    "&:disabled": {
      color: "#cccccc",
      cursor: "default",
    },
  },
});
