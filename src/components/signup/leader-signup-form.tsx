import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Box, Button, LoadingOverlay, PasswordInput, Select, TextInput } from "@mantine/core";
import css from "./leader-signup-form.module.scss";
import { Controller, useForm, Control, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leaderSignUpDto, TLeaderSignUpDto } from "@/libraries/auth/auth.dto";
import { nativeAlert, nativeLogger } from "@/hooks/use-device-api";
import Portal from "../common/modal/portal";
import PostCodeModal from "../common/modal/post-code-modal";
import { Address } from "react-daum-postcode";
import { useCheckBrokerMutation, useSignupMutation } from "@/hooks/tms/use-auth";
import { onNoSpaceChange, onTelChange } from "@/utils/input-handler";

interface Props {
  initState: {
    externalId: TLeaderSignUpDto["externalId"];
    loginTp: TLeaderSignUpDto["loginTp"];
    code: TLeaderSignUpDto["password"];
  };
}

export default function SignupForm({ initState }: Props) {
  const router = useRouter();
  const [showPostCode, setShowPostCode] = useState(false);
  const [step, setStep] = useState(1);

  const locale = router.query.locale?.toString() || "ko";
  const postCodeInputRef = useRef<HTMLInputElement>(null);

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

      // step3
      tel1: "",
      tel2: "",
      tel3: "",
      zipCode: "",
      address: "",
      addressDetail: "",
    },
  });

  const { mutation: mutationSignup, isLoading: isLoadingSignup } = useSignupMutation({ locale });
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

  const step1Next = async () => {
    const isValid = await form.trigger(["contryCode", "loginTp"]);
    if (!isValid) return;

    setStep(() => 2);
  };

  const step1Prev = () => {
    router.back();
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

    mutationSignup.mutate(
      {
        ...form.getValues(),
        tel: [form.getValues("tel1"), form.getValues("tel2"), form.getValues("tel3")].join(""),
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

  return (
    <>
      <div className={css.form}>
        {step === 1 && (
          <Step1 control={form.control} onClickNext={step1Next} onClickPrev={step1Prev} />
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
  control: Control<TLeaderSignUpDto>;
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
