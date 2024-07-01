import { style } from "@vanilla-extract/css";

export const wrap = style({
  marginInline: 75,
});

export const row = style({
  display: "flex",
  marginBottom: 10,
});

export const label = style({
  fontWeight: 600,
  textAlign: "right",
  width: 120,
  marginRight: 10,
});

export const text = style({
  width: "100%",
  textAlign: "center",
});
