import { style } from "@vanilla-extract/css";

export const label = style({
  position: "absolute",
  display: "inline-block",
  padding: "0 2px",
  top: 0,
  transform: "translateY(-50%)",
  fontSize: 12,
  backgroundColor: "#fff",
  zIndex: 1,
  left: 7,
});
