import { globalStyle, style } from "@vanilla-extract/css";
import { rangePickerWrap } from "./rangePicker.css";

export const datePickerWrap = style([
  rangePickerWrap,
  {
    width: 130,
  },
]);

globalStyle(`${datePickerWrap} input`, {
  width: "100%",
});
