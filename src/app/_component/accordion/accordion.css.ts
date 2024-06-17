import { style } from "@vanilla-extract/css";

export const accordion = style({});

export const titleBox = style({
  display: "flex",
  justifyContent: "space-between",
  padding: "6px 10px",
  cursor: "pointer",
  backgroundColor: "#E7E7E5",
});

export const title = style({});

export const icon = style({
  transition: "transform 0.5s ease",
  transform: "rotateX(0deg)",
  selectors: {
    "&.show": {
      transform: "rotateX(-180deg)",
    },
  },
});

export const content = style({
  maxHeight: 0,
  transition: "max-height 0.5s ease",
  overflow: "hidden",
  padding: "0px 10px",

  selectors: {
    "&.show": {
      maxHeight: "100dvh",
    },
  },
});
