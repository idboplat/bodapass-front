import { globalStyle, style } from "@vanilla-extract/css";

export const labelInputBox = style([
  {
    border: "1.25px solid #bfbfbf",
    padding: 7,
    borderRadius: 3,
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: 5,
  },
]);

export const label = style([
  {
    position: "absolute",
    display: "inline-block",
    transition: "all 0.2s ease",
    padding: "0 2px",
  },
]);

export const input = style([
  {
    width: "100%",
    "::placeholder": {
      opacity: 0,
      visibility: "hidden",
      transition: "opacity 0.2s ease, visibility 0.2s ease",
    },
    ":focus": {
      outline: "none",
    },
  },
]);

globalStyle(`${labelInputBox}.focus > ${label}`, {
  top: 0,
  transform: "translateY(-50%)",
  fontSize: 12,
  backgroundColor: "#fff",
});

globalStyle(`${labelInputBox}.focus > ${input}::placeholder`, {
  opacity: 1,
  visibility: "visible",
});
