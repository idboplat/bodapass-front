import { TSignUpDto } from "@/libraries/auth/auth.dto";
import { onNoSpaceChange } from "@/utils/input-handler";
import { Box, Button, Select, TextInput } from "@mantine/core";
import { Controller, useFormContext } from "react-hook-form";
import css from "./remote-crew-signup-home.module.scss";
import { useTCW000100SMQ03 } from "@/hooks/tms/use-authorization";

export default function RemoteCrewStep1({
  workerTp,
  isValidateBrokerId,
  isLoadingBrokerCheck,
  onClickBrokerInputButton,
  onClickNext,
  onClickPrev,
  toggleWorkerTp,
}: {
  workerTp: "2" | "3";
  isValidateBrokerId: boolean;
  isLoadingBrokerCheck: boolean;
  onClickBrokerInputButton: (brokerId: string) => void;
  onClickNext: () => void;
  onClickPrev: () => void;
  toggleWorkerTp: () => void;
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

      {workerTp === "2" && (
        <Controller
          control={form.control}
          name="brkrId"
          render={({ field, fieldState }) => (
            <TextInput
              {...field}
              classNames={{ wrapper: css.brokerInput }}
              mt={28}
              label="반장 아이디 (선택)"
              autoComplete="off"
              error={fieldState.error?.message}
              disabled={isValidateBrokerId}
              placeholder="teamleader1@gmail.com"
              rightSection={
                <Button
                  size="compact-xs"
                  variant="subtle"
                  type="button"
                  loading={isLoadingBrokerCheck}
                  onClick={() => onClickBrokerInputButton(field.value)}
                >
                  {isValidateBrokerId ? "초기화" : "검증"}
                </Button>
              }
            />
          )}
        />
      )}

      <Box mt={28} style={{ textAlign: "right" }}>
        <Button variant="subtle" type="button" onClick={toggleWorkerTp} mr={12}>
          {workerTp === "2" ? "일용직이신가요?" : "팀원이신가요?"}
        </Button>

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
