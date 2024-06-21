import { style } from "@vanilla-extract/css";

export const light = style({
  display: "none",
});

export const btn = style({
  outlineOffset: 2,
  display: "block",
  position: "relative",
  width: "40px",
  height: "20px",
  cursor: "pointer",
  userSelect: "none",
  backgroundColor: "#f0f0f0",
  borderRadius: 9999,
  transition: "all 0.4s ease",
  boxShadow: "0 0 3px rgba(0, 0, 0, 0.4)",
  selectors: {
    "&:after": {
      content: '""',
      width: "50%",
      height: "100%",
      borderRadius: 9999,
      background: "#fff",
      transition: "all 0.2s ease",
      position: "absolute",
      left: "0",
      boxShadow: "0 0 3px rgba(0, 0, 0, 0.4)",
    },
    "&.active": {
      backgroundColor: "var(--toggleBtn-bgColor, #759cff)",
    },
    "&.active:after": {
      left: "50%",
    },
    "&.disabled": {
      backgroundColor: "#f0f0f0   ",
      cursor: "not-allowed",
    },
    "&.disabled:after": {
      backgroundColor: "#f0f0f0 ",
    },
  },
});
