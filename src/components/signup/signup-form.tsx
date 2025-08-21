import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Box, Button, LoadingOverlay, PasswordInput, Select, TextInput } from "@mantine/core";
import css from "./signup-form.module.scss";
import { Controller, useForm, Control, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpDto, TSignUpDto } from "@/libraries/auth/auth.dto";
import { nativeLogger } from "@/apis/native-logger";
import Portal from "../common/modal/portal";
import PostCodeModal from "../common/modal/post-code-modal";
import { Address } from "react-daum-postcode";
import { useCheckBrokerMutation, useSigninMutation } from "@/hooks/tms/use-auth-service";
import { onNoSpaceChange, onTelChange } from "@/utils/input-handler";

interface Props {
  initState: {
    loginTp: TSignUpDto["loginTp"];
    workerTp: TSignUpDto["workerTp"];
    brokerId: TSignUpDto["brokerId"];
    externalId: TSignUpDto["externalId"];
    password: TSignUpDto["password"];
  };
}

export default function SignupForm({ initState }: Props) {
  const router = useRouter();
  const [showPostCode, setShowPostCode] = useState(false);
  const [isValidateBrokerId, setIsValidateBrokerId] = useState(false);
  const [step, setStep] = useState(1);

  const locale = router.query.locale?.toString() || "ko";
  const postCodeInputRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    mode: "onTouched", // 초기 로딩 시 불필요한 검증 방지
    resolver: zodResolver(signUpDto),
    defaultValues: {
      // step1
      contryCode: "82",
      loginTp: initState.loginTp,
      workerTp: initState.workerTp,
      brokerId: initState.brokerId,

      // step2
      externalId: initState.externalId,
      password: initState.password,
      passwordConfirm: initState.password,
      userName: "",

      // step3
      tel1: "",
      tel2: "",
      tel3: "",
      zipCode: "",
      address: "",
      addressDetail: "",
    },
  });

  const workerTp = form.watch("workerTp");

  const { mutation: mutationSignup, isLoading: isLoadingSignup } = useSigninMutation({ locale });
  const { mutation: mutationCheckBroker } = useCheckBrokerMutation({ locale });

  const openPostCode = () => {
    postCodeInputRef.current?.blur();
    setShowPostCode(() => true);
  };

  const closePostCode = () => setShowPostCode(() => false);

  const selectPostCode = (data: Address) => {
    nativeLogger(JSON.stringify(data, null, 2));
    form.setValue("zipCode", data.zonecode);
    form.setValue("address", data.roadAddress);
    form.clearErrors(["zipCode", "address"]);
    closePostCode();
  };

  const onClickBrokerInputButton = (brokerId: string) => {
    if (mutationCheckBroker.isPending) return;

    if (!isValidateBrokerId) {
      mutationCheckBroker.mutate(
        { brokerId },
        {
          onSuccess: () => {
            form.clearErrors("brokerId");
            setIsValidateBrokerId(() => true);
          },
        },
      );
    } else {
      setIsValidateBrokerId(() => false);
    }
  };

  const step1Next = async () => {
    const isValid = await form.trigger(["contryCode", "loginTp", "workerTp", "brokerId"]);
    if (!isValid) return;

    if (form.getValues("workerTp") === "") {
      form.setError("workerTp", { message: "근로 구분을 선택해주세요." });
      return;
    }

    if (form.getValues("brokerId").length > 0 && !isValidateBrokerId) {
      form.setError("brokerId", { message: "추천인 아이디가 검증되지 않았습니다." });
      return;
    }

    setStep(() => 2);
  };

  const step2Next = async () => {
    const isValid = await form.trigger(["externalId", "password", "passwordConfirm", "userName"]);
    if (!isValid) return;

    if (form.getValues("password") !== form.getValues("passwordConfirm")) {
      form.setError("passwordConfirm", { message: "비밀번호가 일치하지 않습니다." });
      return;
    }

    setStep(() => 3);
  };

  const step2Prev = () => {
    setStep(() => 1);
  };

  const step3Prev = () => {
    setStep(() => 2);
  };

  const step3Save = async () => {
    const isValid = await form.trigger();
    if (!isValid) return;

    nativeLogger(JSON.stringify(form.formState, null, 2));

    if (mutationSignup.isPending) return;

    mutationSignup.mutate(form.getValues(), {
      onSuccess: () => {
        alert("회원가입이 완료되었습니다.");
        router.replace(`/${locale}/signin`);
      },
    });
  };

  useEffect(() => {
    if (workerTp !== "2") {
      form.setValue("brokerId", "");
      form.clearErrors("brokerId");
      setIsValidateBrokerId(() => false);
    }
  }, [workerTp, form]);

  return (
    <>
      <div className={css.form}>
        {step === 1 && (
          <Step1
            control={form.control}
            isValidateBrokerId={isValidateBrokerId}
            isLoadingBrokerCheck={mutationCheckBroker.isPending}
            onClickBrokerInputButton={onClickBrokerInputButton}
            onClickNext={step1Next}
          />
        )}
        {step === 2 && (
          <Step2
            control={form.control}
            onClickNext={step2Next}
            onClickPrev={step2Prev}
            loginTp={initState.loginTp}
          />
        )}
        {step === 3 && (
          <Step3
            control={form.control}
            openPostCode={openPostCode}
            onClickPrev={step3Prev}
            onClickSave={step3Save}
          />
        )}

        <LoadingOverlay visible={isLoadingSignup} />
      </div>

      {showPostCode && (
        <Portal>
          <PostCodeModal onClose={closePostCode} onComplete={selectPostCode} />
        </Portal>
      )}
    </>
  );
}

function Step1({
  control,
  isValidateBrokerId,
  isLoadingBrokerCheck,
  onClickBrokerInputButton,
  onClickNext,
}: {
  control: Control<TSignUpDto>;
  isValidateBrokerId: boolean;
  isLoadingBrokerCheck: boolean;
  onClickBrokerInputButton: (brokerId: string) => void;
  onClickNext: () => void;
}) {
  const workerTp = useWatch({ control, name: "workerTp" });

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

      <Controller
        control={control}
        name="workerTp"
        render={({ field, fieldState }) => (
          <Select
            {...field}
            mt={28}
            label="근로 구분"
            error={fieldState.error?.message}
            data={[
              { value: "1", label: "반장" },
              { value: "2", label: "팀원" },
              { value: "3", label: "일용직" },
            ]}
            required
            allowDeselect={false}
          />
        )}
      />
      {workerTp === "2" && (
        <Controller
          control={control}
          name="brokerId"
          render={({ field, fieldState }) => (
            <TextInput
              {...field}
              classNames={{ wrapper: css.brokerInput }}
              mt={28}
              label="반장 아이디"
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
                  {isValidateBrokerId ? "Reset" : "Check"}
                </Button>
              }
            />
          )}
        />
      )}

      <Box mt={28} style={{ textAlign: "right" }}>
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
  control: Control<TSignUpDto>;
  onClickNext: () => void;
  onClickPrev: () => void;
  loginTp: TSignUpDto["loginTp"];
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
          다음
        </Button>
      </Box>
    </div>
  );
}

function Step3({
  control,
  openPostCode,
  onClickPrev,
  onClickSave,
}: {
  control: Control<TSignUpDto>;
  openPostCode: () => void;
  onClickPrev: () => void;
  onClickSave: () => void;
}) {
  return (
    <div>
      <div className={css.telInputField}>
        <div>
          <label id="phone-label">
            전화번호 <span style={{ color: "red" }}>*</span>
          </label>
        </div>

        <div className={css.telInputBox}>
          <Controller
            control={control}
            name="tel1"
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                error={fieldState.error?.message}
                onChange={(e) => onTelChange(e, field.onChange, 4)}
                inputMode="numeric"
                aria-labelledby="phone-label"
                required
              />
            )}
          />

          <span>-</span>

          <Controller
            control={control}
            name="tel2"
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                error={fieldState.error?.message}
                onChange={(e) => onTelChange(e, field.onChange, 4)}
                inputMode="numeric"
                aria-labelledby="phone-label"
                required
              />
            )}
          />

          <span>-</span>

          <Controller
            control={control}
            name="tel3"
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                error={fieldState.error?.message}
                onChange={(e) => onTelChange(e, field.onChange, 4)}
                inputMode="numeric"
                aria-labelledby="phone-label"
                required
              />
            )}
          />
        </div>

        <Controller
          control={control}
          name="zipCode"
          render={({ field, fieldState }) => (
            <TextInput
              {...field}
              mt={28}
              label="우편번호"
              onChange={undefined}
              onFocus={openPostCode}
              error={fieldState.error?.message}
              required
            />
          )}
        />

        <Controller
          control={control}
          name="address"
          render={({ field, fieldState }) => (
            <TextInput
              {...field}
              mt={28}
              label="주소"
              onChange={undefined}
              onFocus={openPostCode}
              error={fieldState.error?.message}
              required
            />
          )}
        />

        <Controller
          control={control}
          name="addressDetail"
          render={({ field, fieldState }) => (
            <TextInput
              {...field}
              mt={28}
              label="상세주소"
              error={fieldState.error?.message}
              required
            />
          )}
        />

        <Box mt={28} style={{ textAlign: "right" }}>
          <Button variant="outline" type="button" onClick={onClickPrev} mr={12}>
            이전
          </Button>

          <Button variant="filled" type="button" onClick={onClickSave}>
            제출
          </Button>
        </Box>
      </div>
    </div>
  );
}
