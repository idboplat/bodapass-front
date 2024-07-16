import { globalStyle, style } from "@vanilla-extract/css";

export const inputBox = style([
  {
    marginBottom: 14,
  },
]);

export const duplicateCheckInput = style([
  { display: "flex", justifyContent: "space-between", gap: 10 },
]);

export const checkBoxDiv = style([
  {
    textAlign: "right",
    padding: 7,
    fontSize: 12,
  },
]);

export const label = style([
  {
    display: "inline-block",
    marginBottom: 2,
  },
]);
