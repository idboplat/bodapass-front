import { placeholderShimmer } from "@/style/keyframe.css";
import { style } from "@vanilla-extract/css";

export const placeHolder = style({
  width: "100%",
  animationDuration: "1.25s",
  animationFillMode: "forwards",
  animationIterationCount: "infinite",
  animationName: placeholderShimmer,
  animationTimingFunction: "linear",
  background: "linear-gradient(to right, #e8e8e8 10%, #dddddd 18%, #e8e8e8 33%)",
  backgroundSize: "800px 104px",
  position: "relative",
  borderRadius: 3,
});
