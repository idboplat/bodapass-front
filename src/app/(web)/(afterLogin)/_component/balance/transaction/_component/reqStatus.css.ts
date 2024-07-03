import { style } from "@vanilla-extract/css";

export const req = style({
  backgroundColor: "#759cff",
  padding: "1px 10px",
  borderRadius: 3,
  color: "#fff",
  transition: "background-color 0.2s ease",
  ":hover": {
    backgroundColor: "#5C83E6",
  },
  ":disabled": {
    backgroundColor: "unset",
    cursor: "default",
  },
});
