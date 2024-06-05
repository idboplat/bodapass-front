import { style } from "@vanilla-extract/css";

export const inputBox = style({
  display: "flex",
  borderBottom: "1px solid #000",
  gap: 5,
});

export const input = style({
  flexGrow: 1,
  padding: 7,
  ":focus": {
    outline: "none",
  },
});
