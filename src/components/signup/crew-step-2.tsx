import { TSignUpDto } from "@/libraries/auth/auth.dto";
import { onNoSpaceChange } from "@/utils/input-handler";
import { Box, Button, Checkbox, Select, TextInput } from "@mantine/core";
import { Controller, useFormContext } from "react-hook-form";
import { useTCW000100SMQ03 } from "@/hooks/tms/use-master";
import { TWrkTp } from "@/types/common";
import { useState } from "react";
import { Address } from "react-daum-postcode";
import { replaceToTelNumber } from "@/utils/regexp";
import Portal from "../common/modal/portal";
import PostCodeModal from "../common/modal/post-code-modal";
import { useRouter } from "next/router";
import { z } from "zod";

export default function CrewStep2({
  session,
  wrkTp,
  locale,
}: {
  session: Session;
  wrkTp: TWrkTp;
  locale: string;
}) {
  const router = useRouter();

  const [showPostCode, setShowPostCode] = useState(false);
  const [isEmailCheck, setIsEmailCheck] = useState(false);

  const TCW000100SMQ03 = useTCW000100SMQ03({ session });
  const form = useFormContext<TSignUpDto>();

  const openPostCode = () => setShowPostCode(() => true);
  const closePostCode = () => setShowPostCode(() => false);

  const selectPostCode = (data: Address) => {
    form.setValue("addr", data.address);
    form.setValue("zipCd", data.zonecode);
    form.clearErrors(["addr", "zipCd"]);
    closePostCode();
  };

  const changeWrkTp = (wrkTp: TWrkTp) => {
    const searchParams = new URLSearchParams(router.asPath.split("?")[1]);
    searchParams.set("wrkTp", wrkTp);
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

    if (isEmailCheck) {
      const result = z.string().email().safeParse(form.getValues("emailAddr"));

      if (!result.success) {
        form.setError("emailAddr", { message: "이메일 형식이 올바르지 않습니다." });
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
    searchParams.set("step", "2");
    router.push(`/${locale}/signup/?${searchParams.toString()}`);
  };

  return (
    <>
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

        {/* 추후에 다시 필요할 수 도 있음 */}
        {/* <Select
        label="근로 구분"
        mt="1rem"
        value={wrkTp}
        data={[
          { value: "2", label: "팀원" },
          { value: "3", label: "일용직" },
        ]}
        allowDeselect={false}
        onChange={(value) => changeWrkTp(value as "2" | "3")}
      /> */}

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
              error={fieldState.error?.message}
              autoComplete="off"
              required
              readOnly
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
              autoComplete="tel"
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
          {/* <Button variant="outline" type="button" onClick={onClickPrev} mr={12}>
          이전
        </Button> */}

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
