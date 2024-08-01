import { style } from "@vanilla-extract/css";

export const accordion = style({
  marginLeft: 10,
});

export const titleBox = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "6px 10px",
  cursor: "pointer",
});

export const title = style({
  fontWeight: 500,
});

export const icon = style({
  transition: "transform 0.2s linear",
  transform: "rotateX(0deg)",
  selectors: {
    "&.show": {
      transform: "rotateX(-180deg)",
    },
  },
});

export const content = style({
  maxHeight: 0,
  transition: "max-height 0.35s cubic-bezier(1, 0, 0, 1);",
  overflow: "hidden",

  selectors: {
    "&.show": {
      maxHeight: "100lvh",
    },
  },
});
