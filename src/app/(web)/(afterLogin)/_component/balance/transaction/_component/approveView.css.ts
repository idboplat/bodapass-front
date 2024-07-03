import { style } from "@vanilla-extract/css";

export const wrap = style({
  position: "relative",
  marginInline: 75,
  border: "1px solid #ccc",
  borderRadius: 3,
  overflow: "hidden",
});

export const row = style({
  display: "flex",
  borderBottom: "1px solid #ccc",
  selectors: {
    "&:last-of-type": {
      borderBottom: "none",
    },
  },
});

export const label = style({
  fontWeight: 600,
  textAlign: "center",
  width: 120,
  borderRight: "1px solid #ccc",
  padding: "5px 10px",
});

export const text = style({
  width: "100%",
  textAlign: "center",
  padding: "5px 10px",
});
