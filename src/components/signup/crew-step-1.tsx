import { TSignUpDto } from "@/libraries/auth/auth.dto";
import { onNoSpaceChange } from "@/utils/input-handler";
import { Box, Button, Select, TextInput } from "@mantine/core";
import { Controller, useFormContext } from "react-hook-form";

export default function CrewStep1({
  wrkTp,
  changeWrkTp,
  onClickNext,
}: // onClickPrev,
{
  wrkTp: "2" | "3";
  changeWrkTp: (wrkTp: "2" | "3") => void;
  // onClickPrev: () => void;
  onClickNext: () => void;
}) {
  const form = useFormContext<TSignUpDto>();

  return (
    <div>
      <Controller
        control={form.control}
        name="cntryCd"
        render={({ field, fieldState }) => (
          <TextInput
            {...field}
            label="국가코드"
            onChange={(e) => onNoSpaceChange(e, field.onChange)}
            error={fieldState.error?.message}
            disabled
          />
        )}
      />

      {/* 추후에 다시 필요할 수 도 있음 */}
      {/* <Select
        label="근로 구분"
        mt="1rem"
        value={wrkTp}
        data={[
          { value: "2", label: "팀원" },
          { value: "3", label: "일용직" },
        ]}
        allowDeselect={false}
        onChange={(value) => changeWrkTp(value as "2" | "3")}
      /> */}

      <Box mt={28} style={{ textAlign: "right" }}>
        {/* <Button variant="outline" type="button" onClick={onClickPrev} mr={12}>
          이전
        </Button> */}

        <Button variant="filled" type="button" onClick={onClickNext}>
          다음
        </Button>
      </Box>
    </div>
  );
}
