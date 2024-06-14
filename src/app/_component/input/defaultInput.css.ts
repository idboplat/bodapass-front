import { style } from "@vanilla-extract/css";

export const inputBox = style([
  {
    border: "1.25px solid #bfbfbf",
    padding: 7,
    borderRadius: 3,
    position: "relative",
    display: "flex",
    gap: 5,
    selectors: {
      "&.disabled": {
        backgroundColor: "#f0f0f0",
      },
    },
  },
]);

export const input = style([
  {
    width: "100%",
    "::placeholder": {
      color: "#bfbfbf",
    },
    ":focus": {
      outline: "none",
    },
  },
]);
