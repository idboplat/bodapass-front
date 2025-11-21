import { TSignUpDto } from "@/libraries/auth/auth.dto";
import { onNoSpaceChange } from "@/utils/input-handler";
import { checkPassword, removeBlank } from "@/utils/regexp";
import { Box, Button } from "@mantine/core";
import { PasswordInput, TextInput } from "@mantine/core";
import { Controller, useFormContext } from "react-hook-form";

export default function Step4({
  loginTp,
  onClickNext,
  onClickPrev,
}: {
  loginTp: "1" | "2" | "3" | "4" | "5";
  onClickNext: () => void;
  onClickPrev: () => void;
}) {
  const form = useFormContext<TSignUpDto>();

  return (
    <div>
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
          제출
        </Button>
      </Box>
    </div>
  );
}
