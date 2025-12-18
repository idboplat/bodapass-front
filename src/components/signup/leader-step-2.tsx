import { TSignUpDto } from "@/libraries/auth/auth.dto";
import { TLoginTp } from "@/types/common";
import { onNoSpaceChange } from "@/utils/input-handler";
import { checkPassword, removeBlank, replaceToTelNumber } from "@/utils/regexp";
import { Box, Button, Checkbox, PasswordInput, TextInput } from "@mantine/core";
import { useMemo, useState } from "react";
import { Address } from "react-daum-postcode";
import { Controller, useFormContext } from "react-hook-form";
import Portal from "../common/modal/portal";
import PostCodeModal from "../common/modal/post-code-modal";
import { useRouter } from "next/router";
import { z } from "zod";
import { SOCIAL_LOGIN_SESSION_STORAGE_KEY } from "@/constants";

export default function LeaderStep2({ loginTp, locale }: { loginTp: TLoginTp; locale: string }) {
  const router = useRouter();

  const [showPostCode, setShowPostCode] = useState(false);
  const [isEmailCheck, setIsEmailCheck] = useState(false);

  const form = useFormContext<TSignUpDto>();

  const openPostCode = () => setShowPostCode(() => true);
  const closePostCode = () => setShowPostCode(() => false);

  const selectPostCode = (data: Address) => {
    form.setValue("addr", data.address);
    form.setValue("zipCd", data.zonecode);
    form.clearErrors(["addr", "zipCd"]);
    closePostCode();
  };

  const onTelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue("tel", replaceToTelNumber(e.target.value));
  };

  const handleEmailCheck = () => {
    setIsEmailCheck((prev) => {
      if (prev === false) {
        // 이메일 초기화
        form.setValue("emailAddr", "");
        form.clearErrors("emailAddr");
      }
      return !prev;
    });
  };

  const onClickPrev = () => {
    router.back();
  };

  const onClickNext = async () => {
    const isValid = await form.trigger(["cntryCd", "zipCd", "addr", "addrDtil", "tel"]);
    if (!isValid) return;

    if (loginTp !== "2") {
      // 소셜 회원가입시
      if (!checkPassword(form.getValues("password"))) {
        form.setError("password", {
          message: "비밀번호는 8자 이상, 영문 대소문자, 숫자, 특수문자를 포함해야 합니다.",
        });
        return;
      }

      if (form.getValues("password") !== form.getValues("passwordConfirm")) {
        form.setError("passwordConfirm", { message: "비밀번호가 일치하지 않습니다." });
        return;
      }
    }

    if (isEmailCheck) {
      const result = z.string().email().safeParse(form.getValues("emailAddr"));

      if (!result.success) {
        form.setError("emailAddr", { message: "이메일 형식이 올바르지 않습니다." });
        return;
      }
    }

    const searchParams = new URLSearchParams(router.asPath.split("?")[1]);
    searchParams.set("step", "3");
    router.push(`/${locale}/signup/?${searchParams.toString()}`);
  };

  const socialLoginId = useMemo(() => {
    try {
      if (loginTp !== "2") return "";
      return JSON.parse(sessionStorage.getItem(SOCIAL_LOGIN_SESSION_STORAGE_KEY) || "{}")
        ?.exterUserId as string;
    } catch (error) {
      console.error(error);
      sessionStorage.removeItem(SOCIAL_LOGIN_SESSION_STORAGE_KEY);
      router.replace(`/${locale}/signin`);
    }
  }, [loginTp, locale, router]);

  return (
    <>
      <div>
        <Controller
          control={form.control}
          name="exterUserId"
          render={({ field, fieldState }) => (
            <TextInput
              {...field}
              mt={28}
              value={loginTp === "2" ? socialLoginId : field.value}
              label="아이디"
              autoComplete="off"
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
                autoComplete="off"
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
                autoComplete="off"
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

        <Controller
          control={form.control}
          name="zipCd"
          render={({ field, fieldState }) => (
            <TextInput
              {...field}
              label="우편번호"
              value={undefined}
              onChange={undefined}
              defaultValue={field.value}
              onFocus={openPostCode}
              autoComplete="off"
              required
              readOnly
              error={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={form.control}
          name="addr"
          render={({ field, fieldState }) => (
            <TextInput
              {...field}
              label="주소"
              value={undefined}
              onChange={undefined}
              defaultValue={field.value}
              onFocus={openPostCode}
              error={fieldState.error?.message}
              autoComplete="off"
              readOnly
              required
            />
          )}
        />

        <Controller
          control={form.control}
          name="addrDtil"
          render={({ field, fieldState }) => (
            <TextInput
              {...field}
              label="상세주소"
              required
              error={fieldState.error?.message}
              autoComplete="address-line2"
            />
          )}
        />

        <Controller
          control={form.control}
          name="tel"
          render={({ field, fieldState }) => (
            <TextInput
              {...field}
              label="전화번호"
              onChange={onTelChange}
              placeholder="-를 제외하고 입력해주세요."
              inputMode="numeric"
              required
              autoComplete="tel"
              error={fieldState.error?.message}
            />
          )}
        />

        <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 10 }}>
          <label htmlFor="emailAgree">이메일 등록 여부</label>
          <Checkbox id="emailAgree" checked={isEmailCheck} onChange={handleEmailCheck} />
        </div>

        {isEmailCheck && (
          <Controller
            control={form.control}
            name="emailAddr"
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                label="이메일"
                mt={28}
                onChange={(e) => onNoSpaceChange(e, field.onChange)}
                inputMode="email"
                autoComplete="email"
                required
                error={fieldState.error?.message}
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

      {showPostCode && (
        <Portal>
          <PostCodeModal onClose={closePostCode} onComplete={selectPostCode} />
        </Portal>
      )}
    </>
  );
}
