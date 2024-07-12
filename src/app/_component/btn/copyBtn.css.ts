import { style } from "@vanilla-extract/css";

export const btn = style({
  display: "inline-block",
  transition: "background-color 0.3s",
  ":hover": {
    backgroundColor: "#f0f0f0",
  },
  ":disabled": {
    cursor: "default",
  },
});
