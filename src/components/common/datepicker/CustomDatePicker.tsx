import { CSSProperties, StylesApiProps } from "@mantine/core";
import { DatePickerInput, DatePickerInputFactory } from "@mantine/dates";
import { Dispatch, SetStateAction } from "react";

interface CustomDatePickerProps {
  id?: string;
  classNames?: StylesApiProps<DatePickerInputFactory>["classNames"];
  inputStyle?: CSSProperties;
  popOverStyle?: CSSProperties;
  height?: number;
  value: [Date | null, Date | null];
  setValue: Dispatch<SetStateAction<[Date | null, Date | null]>>;
}

export default function CustomDatePicker({
  id,
  classNames,
  inputStyle,
  popOverStyle,
  height = 47,
  value,
  setValue,
}: CustomDatePickerProps) {
  return (
    <DatePickerInput
      id={id}
      classNames={classNames}
      type="range"
      valueFormat="YYYY-MM-DD"
      value={value}
      onChange={setValue}
      numberOfColumns={2}
      radius={15}
      styles={{ input: { textAlign: "center", height, ...inputStyle } }}
      popoverProps={{
        styles: { dropdown: { borderRadius: 15, borderColor: "#588CBF", ...popOverStyle } },
      }}
      labelSeparator="~"
    />
  );
}
