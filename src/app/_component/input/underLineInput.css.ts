import { style } from "@vanilla-extract/css";

export const inputBox = style({
  display: "flex",
  borderBottom: "1px solid #000",
  gap: 5,
});

export const input = style({
  width: "100%",
  padding: 7,
  "::placeholder": {
    color: "#bfbfbf",
  },
  ":focus": {
    outline: "none",
  },
});
