import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { Box, Button, PasswordInput, Select, TextInput } from "@mantine/core";
import css from "./signup-form.module.scss";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpDto, TSignUpDto } from "@/libraries/auth/auth.dto";
import { nativeLogger } from "@/apis/native-logger";
import { callTms, StringRspnData } from "@/libraries/call-tms";
import Portal from "../common/modal/portal";
import PostCodeModal from "../common/modal/post-code-modal";
import { Address } from "react-daum-postcode";

interface Props {
  /** 이메일 1, 소셜 2, 전화번호 3 */
  type: "1" | "2" | "3";
}

export default function SignupForm({ type }: Props) {
  const router = useRouter();
  const [showPostCode, setShowPostCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const locale = router.query.locale?.toString() || "ko";
  const postCodeInputRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    defaultValues: {
      externalId: "",
      password: "",
      passwordConfirm: "",
      userName: "",
      tel1: "",
      tel2: "",
      tel3: "",
      loginTp: type,
      workerTp: "1" as const,
      address: "",
      addressDetail: "",
      contryCode: "82",
      zipCode: "",
      brokerId: "",
    },
    resolver: zodResolver(signUpDto),
  });

  const mutateSignup = useMutation({
    mutationFn: (dto: TSignUpDto) =>
      callTms<StringRspnData<1>>({
        svcId: "TCM200001SSP00",
        session: null,
        locale,
        data: [
          dto.externalId,
          [dto.tel1, dto.tel2, dto.tel3].join(""),
          dto.userName,
          dto.loginTp,
          dto.password,
          dto.address,
          dto.addressDetail,
          dto.zipCode,
          dto.contryCode,
          dto.workerTp,
          dto.brokerId,
        ],
      }),
    onMutate: () => setIsLoading(() => true),
    onSuccess: () => {
      alert("회원가입이 완료되었습니다.");
      router.replace(`/${locale}/signin`);
    },
    onError: async (error) => {
      alert(error.message);
      setIsLoading(() => false);
    },
  });

  const submit = (data: TSignUpDto) => {
    nativeLogger(JSON.stringify(form.formState, null, 2));

    if (mutateSignup.isPending) return;

    if (data.password !== data.passwordConfirm) {
      form.setError("passwordConfirm", { message: "비밀번호가 일치하지 않습니다." });
      return;
    }

    mutateSignup.mutate({
      ...data,
    });
  };

  const openPostCode = () => {
    postCodeInputRef.current?.blur();
    setShowPostCode(() => true);
  };

  const onClose = () => setShowPostCode(() => false);

  const onComplete = (data: Address) => {
    nativeLogger(JSON.stringify(data, null, 2));
    form.setValue("zipCode", data.zonecode);
    form.setValue("address", data.roadAddress);
    form.clearErrors(["zipCode", "address"]);
    onClose();
  };

  const onTelChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    callback: (value: string) => void,
    maxLength: number,
  ) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    value.length <= maxLength && callback(value);
  };

  return (
    <>
      <form className={css.form} onSubmit={form.handleSubmit(submit)}>
        <Controller
          control={form.control}
          name="externalId"
          render={({ field }) => (
            <TextInput
              {...field}
              label="아이디"
              type="text"
              error={form.formState.errors.externalId?.message}
              required
            />
          )}
        />

        <Controller
          control={form.control}
          name="password"
          render={({ field }) => (
            <PasswordInput
              {...field}
              mt={28}
              label="비밀번호"
              error={form.formState.errors.password?.message}
              required
            />
          )}
        />

        <Controller
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <PasswordInput
              {...field}
              mt={28}
              label="비밀번호 확인"
              error={form.formState.errors.passwordConfirm?.message}
              required
            />
          )}
        />

        <Controller
          control={form.control}
          name="userName"
          render={({ field }) => (
            <TextInput
              {...field}
              mt={28}
              label="닉네임"
              error={form.formState.errors.userName?.message}
              required
            />
          )}
        />

        <div className={css.telInputField}>
          <div>
            <label id="phone-label">
              전화번호 <span style={{ color: "red" }}>*</span>
            </label>
          </div>

          <div className={css.telInputBox}>
            <Controller
              control={form.control}
              name="tel1"
              render={({ field }) => (
                <TextInput
                  {...field}
                  error={form.formState.errors.tel1?.message}
                  onChange={(e) => onTelChange(e, field.onChange, 4)}
                  inputMode="numeric"
                  aria-labelledby="phone-label"
                  required
                />
              )}
            />

            <span>-</span>

            <Controller
              control={form.control}
              name="tel2"
              render={({ field }) => (
                <TextInput
                  {...field}
                  error={form.formState.errors.tel2?.message}
                  onChange={(e) => onTelChange(e, field.onChange, 4)}
                  inputMode="numeric"
                  aria-labelledby="phone-label"
                  required
                />
              )}
            />

            <span>-</span>

            <Controller
              control={form.control}
              name="tel3"
              render={({ field }) => (
                <TextInput
                  {...field}
                  error={form.formState.errors.tel3?.message}
                  onChange={(e) => onTelChange(e, field.onChange, 4)}
                  inputMode="numeric"
                  aria-labelledby="phone-label"
                  required
                />
              )}
            />
          </div>

          <Controller
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <TextInput
                {...field}
                mt={28}
                label="우편번호"
                onChange={undefined}
                onFocus={openPostCode}
                error={form.formState.errors.zipCode?.message}
                required
              />
            )}
          />

          <Controller
            control={form.control}
            name="address"
            render={({ field }) => (
              <TextInput
                {...field}
                mt={28}
                label="주소"
                onChange={undefined}
                onFocus={openPostCode}
                error={form.formState.errors.address?.message}
                required
              />
            )}
          />

          <Controller
            control={form.control}
            name="addressDetail"
            render={({ field }) => (
              <TextInput
                {...field}
                mt={28}
                label="상세주소"
                error={form.formState.errors.addressDetail?.message}
                required
              />
            )}
          />

          <Controller
            control={form.control}
            name="contryCode"
            render={({ field }) => (
              <TextInput
                {...field}
                mt={28}
                label="국가코드"
                error={form.formState.errors.contryCode?.message}
                disabled
              />
            )}
          />

          <Controller
            control={form.control}
            name="workerTp"
            render={({ field }) => (
              <Select
                {...field}
                mt={28}
                label="근로 구분"
                error={form.formState.errors.brokerId?.message}
                data={[
                  { value: "1", label: "팀장" },
                  { value: "2", label: "팀원" },
                  { value: "3", label: "일용직" },
                ]}
                required
                allowDeselect={false}
              />
            )}
          />

          <Controller
            control={form.control}
            name="brokerId"
            render={({ field }) => (
              <TextInput
                {...field}
                mt={28}
                label="추천인 아이디"
                autoComplete="off"
                error={form.formState.errors.brokerId?.message}
              />
            )}
          />
        </div>

        <Box mt={28} style={{ textAlign: "center" }}>
          <Button variant="filled" type="submit" loading={isLoading}>
            등록
          </Button>
        </Box>
      </form>

      {showPostCode && (
        <Portal>
          <PostCodeModal onClose={onClose} onComplete={onComplete} />
        </Portal>
      )}
    </>
  );
}
