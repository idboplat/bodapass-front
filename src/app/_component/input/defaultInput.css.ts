import { style } from "@vanilla-extract/css";

export const inputBox = style([
  {
    border: "1.25px solid #bfbfbf",
    padding: 7,
    borderRadius: 3,
    position: "relative",
    display: "flex",
    gap: 5,
  },
]);

export const input = style([
  {
    flexGrow: 1, //input이 box를 전부 채우도록
    // border: "1px solid red",
    "::placeholder": {
      opacity: 0,
      visibility: "hidden",
      transition: "opacity 0.2s ease, visibility 0.2s ease",
    },
    ":focus": {
      outline: "none",
    },
  },
]);
