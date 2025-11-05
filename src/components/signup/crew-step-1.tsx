import { TSignUpDto } from "@/libraries/auth/auth.dto";
import { onNoSpaceChange } from "@/utils/input-handler";
import { Box, Button, Select, TextInput } from "@mantine/core";
import { Controller, useFormContext } from "react-hook-form";
import { useTCW000100SMQ03 } from "@/hooks/tms/use-master";

export default function CrewStep1({
  session,
  wrkTp,
  changeWrkTp,
  onClickNext,
}: // onClickPrev,
{
  session: Session;
  wrkTp: "2" | "3";
  changeWrkTp: (wrkTp: "2" | "3") => void;
  // onClickPrev: () => void;
  onClickNext: () => void;
}) {
  const TCW000100SMQ03 = useTCW000100SMQ03({ session });
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
