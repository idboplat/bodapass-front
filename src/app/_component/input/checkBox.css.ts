import { style } from "@vanilla-extract/css";

const SVG_IMAGE =
  "data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e";

export const label = style([
  {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    selectors: {
      "&:before": {
        content: "",
        width: "var(--checkBox-size)",
        height: "var(--checkBox-size)",
        border: "1px solid #ccc",
        marginRight: 5,
        borderRadius: 2,
        transition: "background-color 0.2s ease",
      },
      "&.checked:before": {
        borderColor: "transparent",
        backgroundImage: `url("${SVG_IMAGE}")`,
        backgroundSize: "100% 100%",
        backgroundPosition: "50%",
        backgroundRepeat: "no-repeat",
        backgroundColor: "limegreen",
      },
    },
  },
]);

export const input = style({
  display: "none",
  width: 30,
  height: 30,
  appearance: "none",
});

export const span = style({});
