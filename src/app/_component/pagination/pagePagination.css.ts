import { globalStyle, style } from "@vanilla-extract/css";

export const wrap = style({
  display: "flex",
  gap: 5,
});

globalStyle(`${wrap} > button`, {});

globalStyle(`${wrap} > button:disabled`, {
  color: "red",
});

globalStyle(`${wrap} > button.active`, {
  color: "blue",
  fontWeight: 700,
  cursor: "default",
});
