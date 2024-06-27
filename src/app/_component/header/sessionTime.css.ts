import { style } from "@vanilla-extract/css";

export const btn = style({
  fontWeight: 500,
  transition: "background-color 0.3s ease",
  padding: "3px 5px",
  borderRadius: 3,
  ":hover": {
    backgroundColor: "#e9e9e9",
  },
});
