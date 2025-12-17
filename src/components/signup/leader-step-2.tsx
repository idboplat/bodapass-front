import { useTCW000100SMQ03 } from "@/hooks/tms/use-master";
import { TSignUpDto } from "@/libraries/auth/auth.dto";
import { TLoginTp } from "@/types/common";
import { onNoSpaceChange } from "@/utils/input-handler";
import { checkPassword, removeBlank } from "@/utils/regexp";
import { Box, Button, PasswordInput, Select, TextInput } from "@mantine/core";
import { Controller, useFormContext } from "react-hook-form";

export default function LeaderStep2({
  loginTp,
  onClickNext,
  onClickPrev,
}: {
  loginTp: TLoginTp;
  onClickPrev: () => void;
  onClickNext: () => void;
}) {
  const TCW000100SMQ03 = useTCW000100SMQ03({ session: null });
  const form = useFormContext<TSignUpDto>();

  return (
    <div>
      {/* <Controller
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
      /> */}

      <Controller
        control={form.control}
        name="externalId"
        render={({ field, fieldState }) => (
          <TextInput
            {...field}
            mt={28}
            label="아이디"
            type="text"
            onChange={(e) => onNoSpaceChange(e, field.onChange)}
            error={fieldState.error?.message}
            required
            disabled={loginTp === "2"}
          />
        )}
      />

      {loginTp !== "2" && (
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <PasswordInput
              {...field}
              mt={28}
              label="비밀번호"
              onChange={(e) => {
                const value = removeBlank(e.target.value);
                const valid = checkPassword(value);

                form.clearErrors(["password", "passwordConfirm"]);

                if (!valid) {
                  form.setError("password", {
                    message:
                      "비밀번호는 8자 이상, 영문 대소문자, 숫자, 특수문자를 포함해야 합니다.",
                  });
                }

                if (valid && value !== form.getValues("passwordConfirm")) {
                  form.setError("password", { message: "비밀번호가 일치하지 않습니다." });
                }

                form.setValue("password", value);
              }}
              error={fieldState.error?.message}
              required
            />
          )}
        />
      )}

      {loginTp !== "2" && (
        <Controller
          control={form.control}
          name="passwordConfirm"
          render={({ field, fieldState }) => (
            <PasswordInput
              {...field}
              mt={28}
              label="비밀번호 확인"
              onChange={(e) => {
                const value = removeBlank(e.target.value);

                form.clearErrors(["password", "passwordConfirm"]);

                if (value !== form.getValues("password")) {
                  form.setError("passwordConfirm", { message: "비밀번호가 일치하지 않습니다." });
                }

                form.setValue("passwordConfirm", value);
              }}
              error={fieldState.error?.message}
              required
            />
          )}
        />
      )}

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
