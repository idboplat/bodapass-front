import { TSignUpDto } from "@/libraries/auth/auth.dto";
import { onNoSpaceChange } from "@/utils/input-handler";
import { Box, Button, Select, TextInput } from "@mantine/core";
import { Controller, useFormContext } from "react-hook-form";
import css from "./remote-crew-signup-home.module.scss";
import { useTCW000100SMQ03 } from "@/hooks/tms/use-master";
import { TWrkTp } from "@/types/common";
import { useState } from "react";

export default function RemoteCrewStep2({
  wrkTp,
  initialBrkrId,
  isValidateBrokerId,
  isLoadingBrokerCheck,
  brkrIdError,
  onClickBrokerInputButton,
  onClickNext,
  onClickPrev,
  toggleWorkerTp,
}: {
  wrkTp: TWrkTp;
  initialBrkrId: string;
  isValidateBrokerId: boolean;
  isLoadingBrokerCheck: boolean;
  brkrIdError: string | null;
  onClickBrokerInputButton: (brokerId: string) => void;
  onClickNext: () => void;
  onClickPrev: () => void;
  toggleWorkerTp: () => void;
}) {
  const [brkrIdValue, setBrkrIdValue] = useState(initialBrkrId);

  const form = useFormContext<TSignUpDto>();

  const TCW000100SMQ03 = useTCW000100SMQ03({ session: null });

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

      {wrkTp === "2" && (
        <TextInput
          classNames={{ wrapper: css.brokerInput }}
          mt={28}
          label="반장 아이디 (선택)"
          autoComplete="off"
          disabled={isValidateBrokerId}
          value={brkrIdValue}
          onChange={(e) => setBrkrIdValue(e.target.value)}
          placeholder="teamleader1@gmail.com"
          error={brkrIdError}
          rightSection={
            <Button
              size="compact-xs"
              variant="subtle"
              type="button"
              loading={isLoadingBrokerCheck}
              onClick={() => onClickBrokerInputButton(brkrIdValue)}
            >
              {isValidateBrokerId ? "초기화" : "검증"}
            </Button>
          }
        />
      )}

      <Box mt={28} style={{ textAlign: "right" }}>
        <Button variant="subtle" type="button" onClick={toggleWorkerTp} mr={12}>
          {wrkTp === "2" ? "일용직이신가요?" : "팀원이신가요?"}
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
