import { globalStyle, keyframes, style } from "@vanilla-extract/css";

const rotate = keyframes({
  "100%": {
    transform: "rotate(360deg)",
  },
});

const prixClipFix = keyframes({
  "0%": { clipPath: "polygon(50% 50%,0 0,0 0,0 0,0 0,0 0)" },
  "25%": { clipPath: "polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0)" },
  "50%": { clipPath: "polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%)" },
  "75%": { clipPath: "polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 100%)" },
  "100%": { clipPath: "polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 0)" },
});

export const loader = style({
  display: "block",
  width: 32,
  height: 32,
  borderRadius: 9999,
  position: "relative",
  animation: `${rotate} 1s linear infinite`,
});

globalStyle(`${loader}::before`, {
  content: "",
  boxSizing: "border-box",
  position: "absolute",
  inset: 0,
  borderRadius: 9999,
  border: "4px solid #3498db",
  animation: `${prixClipFix} 2s linear infinite`,
  width: "100%",
  height: "100%",
});
