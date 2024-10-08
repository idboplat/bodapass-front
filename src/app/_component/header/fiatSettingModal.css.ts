import { style } from "@vanilla-extract/css";

export const list = style({
  alignItems: "center",
  justifyContent: "center",
});

export const item = style({
  selectors: {
    "&:not(:last-of-type)": {
      borderBottom: "1px solid #e3e3e3",
    },
  },
});

export const button = style({
  paddingBlock: 10,
  paddingInline: 20,
  fontSize: 16,
  width: "100%",
  height: "100%",
  textAlign: "left",
  transition: "background-color 0.2s ease",

  selectors: {
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
  },
});
