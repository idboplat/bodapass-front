import { useRouter } from "next/router";
import { useState } from "react";
import { Box, Button, LoadingOverlay, PasswordInput, TextInput } from "@mantine/core";
import css from "./crew-signup-form.module.scss";
import { Controller, useForm, Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { crewSignUpDto, TCrewSignUpDto } from "@/libraries/auth/auth.dto";
import { nativeAlert, nativeLogger } from "@/hooks/use-device-api";
import { useCheckBrokerMutation, useSignupMutation } from "@/hooks/tms/use-auth";
import { onNoSpaceChange } from "@/utils/input-handler";

interface Props {
  initState: {
    loginTp: TCrewSignUpDto["loginTp"];
    brokerId: TCrewSignUpDto["brkrId"];
    externalId: TCrewSignUpDto["externalId"];
    password: TCrewSignUpDto["password"];
  };
  workerTp: "2" | "3";
}

export default function CrewSignupForm({ initState, workerTp }: Props) {
  const router = useRouter();
  const asPath = router.asPath;
  const locale = router.query.locale?.toString() || "ko";

  const [isValidateBrokerId, setIsValidateBrokerId] = useState(false);
  const [step, setStep] = useState(1);

  const form = useForm({
    mode: "onTouched", // 초기 로딩 시 불필요한 검증 방지
    resolver: zodResolver(crewSignUpDto),
    defaultValues: {
      // step1
      contryCode: "82",
      loginTp: initState.loginTp,
      brkrId: initState.brokerId,

      // step2
      externalId: initState.externalId,
      password: initState.password,
      passwordConfirm: initState.password,
      userName: "",
    },
  });

  const { mutation: mutationSignup, isLoading: isLoadingSignup } = useSignupMutation({ locale });
  const { mutation: mutationCheckBroker } = useCheckBrokerMutation({ locale });

  const onClickBrokerInputButton = (brokerId: string) => {
    if (mutationCheckBroker.isPending) return;

    if (!isValidateBrokerId) {
      mutationCheckBroker.mutate(
        { brokerId },
        {
          onSuccess: () => {
            form.clearErrors("brkrId");
            setIsValidateBrokerId(() => true);
          },
        },
      );
    } else {
      setIsValidateBrokerId(() => false);
    }
  };

  const step1Next = async () => {
    if (workerTp === "2") {
      // 팀원의 경우
      const isValid = await form.trigger(["contryCode", "loginTp", "brkrId"]);
      if (!isValid) return;

      if (form.getValues("brkrId").length > 0 && !isValidateBrokerId) {
        form.setError("brkrId", { message: "반장 아이디가 검증되지 않았습니다." });
        return;
      }
    }

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

  const onClickWorpTpToggle = () => {
    form.setValue("brkrId", "");
    form.clearErrors("brkrId");
    setIsValidateBrokerId(() => false);

    const [pathname, search] = asPath.split("?");
    const searchParams = new URLSearchParams(search);
    searchParams.set("workerTp", workerTp === "2" ? "3" : "2");
    const url = pathname + "?" + searchParams.toString();
    router.push(url);
  };

  return (
    <div className={css.form}>
      {step === 1 && (
        <Step1
          workerTp={workerTp}
          control={form.control}
          isValidateBrokerId={isValidateBrokerId}
          isLoadingBrokerCheck={mutationCheckBroker.isPending}
          onClickBrokerInputButton={onClickBrokerInputButton}
          onClickNext={step1Next}
          onClickPrev={step1Prev}
          toggleWorkerTp={onClickWorpTpToggle}
        />
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
  );
}

function Step1({
  workerTp,
  control,
  isValidateBrokerId,
  isLoadingBrokerCheck,
  onClickBrokerInputButton,
  onClickNext,
  onClickPrev,
  toggleWorkerTp,
}: {
  workerTp: "2" | "3";
  control: Control<TCrewSignUpDto>;
  isValidateBrokerId: boolean;
  isLoadingBrokerCheck: boolean;
  onClickBrokerInputButton: (brokerId: string) => void;
  onClickNext: () => void;
  onClickPrev: () => void;
  toggleWorkerTp: () => void;
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

      {workerTp === "2" && (
        <Controller
          control={control}
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

function Step2({
  control,
  onClickNext,
  onClickPrev,
  loginTp,
}: {
  control: Control<TCrewSignUpDto>;
  onClickNext: () => void;
  onClickPrev: () => void;
  loginTp: TCrewSignUpDto["loginTp"];
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
