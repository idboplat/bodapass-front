import { globalStyle, style } from "@vanilla-extract/css";

export const navWrap = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: 120,
  gap: 10,
});

export const historyFilterwrap = style({
  display: "flex",
  gap: 30,
});

export const btnWrap = style({
  display: "flex",
  gap: 10,
});

export const inputWrap = style({
  display: "flex",
  gap: 10,
  alignItems: "center",
});

export const datePickerWrap = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 10,
});

export const selectBoxWrap = style({
  position: "relative",
});

export const btnBox = style({
  display: "flex",
  gap: 10,
  alignItems: "center",
});

export const viewWrap = style({
  display: "flex",
  fontSize: 16,
  fontWeight: 500,
  whiteSpace: "nowrap",
});

globalStyle(`${viewWrap} > div`, {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
});

globalStyle(`${viewWrap} sub`, {
  fontSize: 14,
  color: "#555",
});
