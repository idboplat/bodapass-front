import { style } from "@vanilla-extract/css";

export const req = style({
  borderRadius: 3,
  paddingInline: 5,
  fontWeight: 600,
  transition: "background-color 0.2s ease",
  ":hover": {
    backgroundColor: "#cccccc",
  },
});
