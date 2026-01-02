import { TSignUpDto } from "@/libraries/auth/auth.dto";
import { Box, Button, Checkbox, PasswordInput, Select, TextInput } from "@mantine/core";
import { Controller, useFormContext } from "react-hook-form";
import css from "./remote-crew-signup-home.module.scss";
import { useTCW000100SMQ03 } from "@/hooks/tms/use-master";
import { TLoginTp, TWrkTp } from "@/types/common";
import { useMemo, useState } from "react";
import { checkPassword, removeBlank, replaceToTelNumber } from "@/utils/regexp";
import { Address } from "react-daum-postcode";
import Portal from "../common/modal/portal";
import PostCodeModal from "../common/modal/post-code-modal";
import { useRouter } from "next/router";
import { useTCM200001SSQ00 } from "@/hooks/tms/use-auth";
import { z } from "zod";
import { onNoSpaceChange } from "@/utils/input-handler";
import { SOCIAL_LOGIN_SESSION_STORAGE_KEY } from "@/constants";
import { AnimatePresence } from "motion/react";

export default function RemoteCrewStep2({
  wrkTp,
  initialBrkrId,
  locale,
  loginTp,
}: {
  wrkTp: TWrkTp;
  initialBrkrId: string;
  locale: string;
  loginTp: TLoginTp;
}) {
  const router = useRouter();

  const [isValidateBrokerId, setIsValidateBrokerId] = useState(false);
  const [brkrIdError, setBrkrIdError] = useState<string | null>(null);
  const [brkrIdValue, setBrkrIdValue] = useState(initialBrkrId);
  const [showPostCode, setShowPostCode] = useState(false);
  const [isEmailCheck, setIsEmailCheck] = useState(false);

  const form = useFormContext<TSignUpDto>();

  const TCM200001SSQ00 = useTCM200001SSQ00();
  const TCW000100SMQ03 = useTCW000100SMQ03({ session: null });

  const openPostCode = () => setShowPostCode(() => true);
  const closePostCode = () => setShowPostCode(() => false);

  const selectPostCode = (data: Address) => {
    form.setValue("addr", data.address);
    form.setValue("zipCd", data.zonecode);
    form.clearErrors(["addr", "zipCd"]);
    closePostCode();
  };

  const onClickBrokerInputButton = (brokerId: string) => {
    if (TCM200001SSQ00.isPending) return;

    if (isValidateBrokerId) {
      setIsValidateBrokerId(() => false);
    } else {
      TCM200001SSQ00.mutate(
        { brkrId: brokerId },
        {
          onSuccess: () => {
            setIsValidateBrokerId(() => true);
          },
        },
      );
    }
  };

  const toggleWorkerTp = () => {
    setIsValidateBrokerId(() => false);
    setBrkrIdError(() => null);

    const searchParams = new URLSearchParams(router.asPath.split("?")[1]);
    searchParams.set("wrkTp", wrkTp === "2" ? "3" : "2");
    searchParams.set("brkrId", "");
    router.replace(`/${locale}/signup/?${searchParams.toString()}`);
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

    if (brkrIdValue.length > 0 && !isValidateBrokerId) {
      setBrkrIdError(() => "반장 아이디가 검증되지 않았습니다.");
      return;
    }

    const searchParams = new URLSearchParams(router.asPath.split("?")[1]);
    searchParams.set("step", "3");
    searchParams.set("brkrId", brkrIdValue);
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
        {wrkTp === "2" && (
          <TextInput
            classNames={{ wrapper: css.brokerInput }}
            mt={28}
            label="반장 아이디 (선택)"
            autoComplete="off"
            disabled={isValidateBrokerId}
            value={brkrIdValue}
            onChange={(e) => setBrkrIdValue(e.target.value)}
            placeholder="반장 아이디를 입력해주세요."
            error={brkrIdError}
            rightSection={
              <Button
                size="compact-xs"
                variant="subtle"
                type="button"
                loading={TCM200001SSQ00.isPending}
                onClick={() => onClickBrokerInputButton(brkrIdValue)}
              >
                {isValidateBrokerId ? "초기화" : "검증"}
              </Button>
            }
          />
        )}

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
              required
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
              required
            />
          )}
        />

        <Controller
          control={form.control}
          name="addrDtil"
          render={({ field, fieldState }) => (
            <TextInput {...field} label="상세주소" required error={fieldState.error?.message} />
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

      <AnimatePresence>
        {showPostCode && (
          <Portal>
            <PostCodeModal onClose={closePostCode} onComplete={selectPostCode} />
          </Portal>
        )}
      </AnimatePresence>
    </>
  );
}
