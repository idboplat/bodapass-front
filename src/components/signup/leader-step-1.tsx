import { useTCW000100SMQ03 } from "@/hooks/tms/use-authorization";
import { TSignUpDto } from "@/libraries/auth/auth.dto";
import { Box, Button, Select, TextInput } from "@mantine/core";
import { Controller, useFormContext } from "react-hook-form";

export default function LeaderStep1({
  onClickNext,
  onClickPrev,
}: {
  onClickPrev: () => void;
  onClickNext: () => void;
}) {
  const TCW000100SMQ03 = useTCW000100SMQ03(null);
  const form = useFormContext<TSignUpDto>();

  return (
    <div>
      <Controller
        control={form.control}
        name="cntryCd"
        render={({ field, fieldState }) => (
          <Select
            {...form.register("cntryCd")}
            label="국가 선택"
            searchable
            data={TCW000100SMQ03.data?.map((d) => ({
              value: d.cntryCd,
              label: `${d.cntryKoNm}`,
            }))}
            allowDeselect={false}
            onChange={(value) => form.setValue("cntryCd", value || "")}
            value={form.getValues("cntryCd")}
            styles={{
              dropdown: {
                maxHeight: 250,
                overflow: "auto",
                scrollbarWidth: "auto",
              },
            }}
            disabled={TCW000100SMQ03.isPending}
            placeholder={
              TCW000100SMQ03.isPending ? "국가 정보를 불러오는 중입니다..." : "국가을 선택해주세요"
            }
          />
        )}
      />

      <Box mt={28} style={{ textAlign: "right" }}>
        <Button variant="outline" type="button" onClick={onClickPrev} mr={12}>
          이전
        </Button>

        <Button variant="filled" type="button" onClick={onClickNext}>
          다음
        </Button>
      </Box>
    </div>
  );
}
