import { TRangePickerChangeEventHandler, TRangePickerValue } from "@/types/common";
import { CSSProperties, StylesApiProps } from "@mantine/core";
import { DatePickerInput, DatePickerInputFactory } from "@mantine/dates";

interface CustomRangePickerInputProps {
  id?: string;
  classNames?: StylesApiProps<DatePickerInputFactory>["classNames"];
  inputStyle?: CSSProperties;
  popOverStyle?: CSSProperties;
  height?: number;
  value: TRangePickerValue;
  onChange: TRangePickerChangeEventHandler;
}

export default function CustomRangePickerInput({
  id,
  classNames,
  inputStyle,
  popOverStyle,
  height = 47,
  value,
  onChange,
}: CustomRangePickerInputProps) {
  return (
    <DatePickerInput
      id={id}
      classNames={classNames}
      type="range"
      valueFormat="YYYY-MM-DD"
      value={value}
      onChange={onChange}
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
