import { style } from "@vanilla-extract/css";

export const req = style({
  backgroundColor: "#759cff",
  padding: "2px 10px",
  borderRadius: 3,
  color: "#fff",
  transition: "background-color 0.2s ease",
  ":hover": {
    backgroundColor: "#5C83E6",
  },
  ":disabled": {
    background: "#d9e3f4",
    cursor: "default",
  },
});
