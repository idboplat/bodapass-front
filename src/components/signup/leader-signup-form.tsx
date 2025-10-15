import { useRouter } from "next/router";
import { useState } from "react";
import { Box, Button, LoadingOverlay, PasswordInput, TextInput } from "@mantine/core";
import css from "./leader-signup-form.module.scss";
import { Controller, useForm, Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leaderSignUpDto, TLeaderSignUpDto } from "@/libraries/auth/auth.dto";
import { nativeAlert, nativeLogger } from "@/hooks/use-device-api";
import { useSignupMutation } from "@/hooks/tms/use-auth";
import { onNoSpaceChange } from "@/utils/input-handler";

interface Props {
  initState: {
    externalId: TLeaderSignUpDto["externalId"];
    loginTp: TLeaderSignUpDto["loginTp"];
    code: TLeaderSignUpDto["password"];
  };
}

export default function LeaderSignupForm({ initState }: Props) {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const locale = router.query.locale?.toString() || "ko";

  const form = useForm({
    mode: "onTouched", // 초기 로딩 시 불필요한 검증 방지
    resolver: zodResolver(leaderSignUpDto),
    defaultValues: {
      // step1
      contryCode: "82",
      loginTp: initState.loginTp,

      // step2
      externalId: initState.externalId,
      password: initState.code,
      passwordConfirm: initState.code,
      userName: "",
    },
  });

  const { mutation: mutationSignup, isLoading: isLoadingSignup } = useSignupMutation({ locale });

  const step1Next = async () => {
    const isValid = await form.trigger(["contryCode", "loginTp"]);
    if (!isValid) return;

    setStep(() => 2);
  };

  const step1Prev = () => {
    router.back();
  };

  const step2Save = async () => {
    if (mutationSignup.isPending) return;

    const isValid = await form.trigger();
    if (!isValid) return;

    if (form.getValues("password") !== form.getValues("passwordConfirm")) {
      form.setError("passwordConfirm", { message: "비밀번호가 일치하지 않습니다." });
      return;
    }

    nativeLogger(JSON.stringify(form.formState, null, 2));

    mutationSignup.mutate(
      {
        ...form.getValues(),
        workerTp: "1",
        brkrId: "",
      },
      {
        onSuccess: () => {
          nativeAlert("회원가입이 완료되었습니다.");
          router.replace(`/${locale}/signin`);
        },
      },
    );
  };

  const step2Prev = () => {
    setStep(() => 1);
  };

  return (
    <>
      <div className={css.form}>
        {step === 1 && (
          <Step1 control={form.control} onClickNext={step1Next} onClickPrev={step1Prev} />
        )}
        {step === 2 && (
          <Step2
            control={form.control}
            onClickNext={step2Save}
            onClickPrev={step2Prev}
            loginTp={initState.loginTp}
          />
        )}

        <LoadingOverlay visible={isLoadingSignup} />
      </div>
    </>
  );
}

function Step1({
  control,
  onClickNext,
  onClickPrev,
}: {
  control: Control<TLeaderSignUpDto>;
  onClickPrev: () => void;
  onClickNext: () => void;
}) {
  return (
    <div>
      <Controller
        control={control}
        name="contryCode"
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

function Step2({
  control,
  onClickNext,
  onClickPrev,
  loginTp,
}: {
  control: Control<TLeaderSignUpDto>;
  onClickNext: () => void;
  onClickPrev: () => void;
  loginTp: TLeaderSignUpDto["loginTp"];
}) {
  return (
    <div>
      <Controller
        control={control}
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
            disabled={loginTp !== "1"}
          />
        )}
      />

      {loginTp === "1" && (
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState }) => (
            <PasswordInput
              {...field}
              mt={28}
              label="비밀번호"
              onChange={(e) => onNoSpaceChange(e, field.onChange)}
              error={fieldState.error?.message}
              required
              disabled={loginTp !== "1"}
            />
          )}
        />
      )}

      {loginTp === "1" && (
        <Controller
          control={control}
          name="passwordConfirm"
          render={({ field, fieldState }) => (
            <PasswordInput
              {...field}
              mt={28}
              label="비밀번호 확인"
              onChange={(e) => onNoSpaceChange(e, field.onChange)}
              error={fieldState.error?.message}
              required
            />
          )}
        />
      )}

      <Controller
        control={control}
        name="userName"
        render={({ field, fieldState }) => (
          <TextInput
            {...field}
            mt={28}
            label="닉네임"
            onChange={(e) => onNoSpaceChange(e, field.onChange)}
            error={fieldState.error?.message}
            required
          />
        )}
      />

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
