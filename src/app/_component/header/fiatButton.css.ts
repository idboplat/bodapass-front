import { flexCenter } from "@/style/var";
import { style } from "@vanilla-extract/css";

export const button = style([
  flexCenter,
  {
    borderRadius: 10,
    padding: 5,
    transition: "background-color 0.2s ease",
    fontSize: 14,
    gap: 5,
    fontWeight: 600,
    ":hover": {
      backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
  },
]);
