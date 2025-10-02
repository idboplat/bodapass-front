import Image from "next/image";
import BackHeader from "../common/back-header";
import { TScannedResult } from "./dto";
import { useEffect, useRef, useState } from "react";
import css from "./id-card-form.module.scss";
import { useForm } from "react-hook-form";
import { Button, LoadingOverlay, TextInput } from "@mantine/core";
import { findEntity, IdCardEntity } from "@/types/tp";
import { useMutation } from "@tanstack/react-query";
import { callWas, StringRspnData } from "@/libraries/call-tms";
import { useRouter } from "next/router";
import { Address } from "react-daum-postcode";
import Portal from "../common/modal/portal";
import PostCodeModal from "../common/modal/post-code-modal";
import { useSession } from "@/libraries/auth/use-session";
import { replaceToTelNumber } from "@/utils/regexp";

interface Props {
  brkrId: string;
  scannedResult: TScannedResult;
  resetScanned: () => void;
}

export default function IdCardForm({ scannedResult, resetScanned, brkrId }: Props) {
  const { data: session } = useSession();
  if (!session) throw new Error("Session is not found");

  const router = useRouter();
  const locale = router.query.locale;

  const postCodeInputRef = useRef<HTMLInputElement>(null);

  const [showPostCode, setShowPostCode] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const form = useForm({
    defaultValues: {
      id1: scannedResult.id1,
      id2: scannedResult.id2,
      name: scannedResult.name,
      addr: "",
      addrDtil: "",
      tel: "",
    },
  });

  const openPostCode = () => {
    postCodeInputRef.current?.blur();
    setShowPostCode(() => true);
  };

  const closePostCode = () => setShowPostCode(() => false);

  const selectPostCode = (data: Address) => {
    form.setValue("addr", data.address);
    form.clearErrors(["addr", "addrDtil"]);
    closePostCode();
  };

  const onTelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue("tel", replaceToTelNumber(e.target.value));
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await callWas<StringRspnData<1>>({
        svcId: "TCW000002SSP02",
        apiPathName: "WCW000002SSP02",
        session,
        locale: "ko",
        data: [
          brkrId,
          "jpeg",
          scannedResult.name,
          scannedResult.id1 + scannedResult.id2,
          scannedResult.type,
          form.getValues("addr"),
          form.getValues("addrDtil"),
          form.getValues("tel").replaceAll("-", ""),
        ],
        formData: [scannedResult.image],
      });

      const data = res.svcRspnData?.[0];

      if (!data) throw new Error("FW999");

      return data;
    },
    onSuccess: (data) => {
      router.replace(`/${locale}/authorization/crew/${data.F01}/face`);
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  const onSubmit = () => {
    console.log(form.getValues());
    mutation.mutate();
  };

  useEffect(() => {
    const url = URL.createObjectURL(scannedResult.image);
    setImageUrl(() => url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [scannedResult.image]);

  return (
    <>
      <BackHeader title="신분증" onClickBack={resetScanned} />
      <div className={css.infoBox}>
        <div>반장 ID: {brkrId}</div>
        <div>신분증 종류: {findEntity(IdCardEntity, scannedResult.type)?.[1]}</div>
      </div>

      <div className={css.imageBox}>{imageUrl && <Image src={imageUrl} alt="신분증" fill />}</div>

      <div className={css.formBox}>
        <TextInput {...form.register("name")} label="이름" mt={0} />

        <div className={css.idBox}>
          <label>주민등록번호</label>
          <div className={css.idInputBox}>
            <TextInput {...form.register("id1")} />
            <TextInput {...form.register("id2")} />
          </div>
        </div>

        <Button variant="outline" size="xs" type="button" onClick={openPostCode} mt={"1rem"}>
          주소 검색
        </Button>

        <TextInput {...form.register("addr")} label="주소" />
        <TextInput {...form.register("addrDtil")} label="상세주소" />
        <TextInput {...form.register("tel")} label="전화번호" onChange={onTelChange} />
      </div>

      <div className={css.submitButtonBox}>
        <Button variant="filled" type="button" onClick={onSubmit} loading={mutation.isPending}>
          제출
        </Button>
      </div>

      <LoadingOverlay visible={mutation.isPending} />

      {showPostCode && (
        <Portal>
          <PostCodeModal onClose={closePostCode} onComplete={selectPostCode} />
        </Portal>
      )}
    </>
  );
}
