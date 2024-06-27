import { style } from "@vanilla-extract/css";

export const navWrap = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: 120,
});

export const historyFilterwrap = style({
  display: "flex",
  gap: 30,
});

export const btnWrap = style({
  marginLeft: "auto",
  display: "flex",
  gap: 10,
});

export const inputWrap = style({
  display: "flex",
  gap: 10,
  alignItems: "center",
});
