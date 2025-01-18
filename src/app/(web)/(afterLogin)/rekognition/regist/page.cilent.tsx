"use client";
import BackHeader from "@/components/common/header/BackHeader";
import LivenessDetector from "@/components/liveness/LivenessDetector";
import { useRouter } from "next/navigation";
import css from "./page.module.scss";
import classNames from "classnames";
import { useState } from "react";
import { useSinglePage } from "@/hooks/useSinglePage";
import RegistForm from "@/components/liveness/RegistForm";
import { TRegistInfo } from "@/types/common";
import RegistResult from "@/components/liveness/RegistResult";
import { LivenessError } from "@/libraries/error";
import { useMutation } from "@tanstack/react-query";
import { IndexFacesCommandOutput } from "@aws-sdk/client-rekognition";

const START_PAGE = 0;
const LAST_PAGE = 3;

export default function Client() {
  const router = useRouter();
  const { page, nextPage, prevPage, resetPage } = useSinglePage({
    start: START_PAGE,
    max: LAST_PAGE,
  });

  const [info, setInfo] = useState<TRegistInfo>({
    userName: "",
    collectionId: "",
  });

  const [result, setResult] = useState<any>({});

  const mutation = useMutation({
    mutationFn: async (arg: { image: Blob }) => {
      const formData = new FormData();
      formData.append("image", arg.image, "capture.png");
      const res = await fetch(`/api/aws/collections/${info.collectionId}/faces/${info.userName}`, {
        method: "POST",
        body: formData,
      });
      const json: { message: string; data: string; response: IndexFacesCommandOutput } =
        await res.json();
      return json;
    },
    onSuccess: (data) => {
      console.log("liveness 등록 결과", data);
      setResult(() => ({ ...data }));
      nextPage();
    },
  });

  const onClickBack = () => {
    if (page > 0) {
      prevPage();
      return;
    }

    router.back();
  };

  const updateInfo = (state: TRegistInfo) => {
    setInfo(() => ({ ...state }));
    nextPage();
  };

  const onSuccessDetector = (image: Blob) => {
    console.log("liveness image 생성");
    mutation.mutate({ image });
  };

  const onErrorDetector = (error: LivenessError) => {
    console.error(error);
  };

  const onUserCancelDetector = () => {
    console.log("user cancel");
    resetPage();
  };

  return (
    <>
      <BackHeader title="Registration" onClickBack={onClickBack} />
      <div className={classNames(css.wrap)}>
        {page === 0 && <RegistForm info={info} updateInfo={updateInfo} />}
        {page === 1 && (
          <LivenessDetector
            onSuccess={onSuccessDetector}
            onError={onErrorDetector}
            onUserCancel={onUserCancelDetector}
          />
        )}
        {page === 2 && <RegistResult result={result} />}
      </div>
    </>
  );
}
