import { DatePickerInput } from "@mantine/dates";
import { Dispatch, SetStateAction } from "react";

interface CustomDatePickerProps {
  id: string;
  height: number;
  value: [Date | null, Date | null];
  setValue: Dispatch<SetStateAction<[Date | null, Date | null]>>;
}

export default function CustomDatePicker({ id, height, value, setValue }: CustomDatePickerProps) {
  return (
    <DatePickerInput
      id={id}
      type="range"
      valueFormat="YYYY-MM-DD"
      value={value}
      onChange={setValue}
      numberOfColumns={2}
      radius={15}
      styles={{ input: { textAlign: "center", height } }}
      popoverProps={{
        styles: { dropdown: { borderRadius: 15, borderColor: "#588CBF" } },
      }}
      labelSeparator="~"
    />
  );
}
