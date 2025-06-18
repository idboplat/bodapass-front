"use client";
import BackHeader from "@/components/common/header/BackHeader";
import CompareForm from "@/components/liveness/CompareForm";
import LivenessDetector from "@/components/liveness/LivenessDetector";
import RegistResult from "@/components/liveness/RegistResult";
import { useSinglePage } from "@/hooks/useSinglePage";
import { LivenessError } from "@/libraries/error";
import { TCompareInfo } from "@/types/common";
import { SearchFacesCommandOutput } from "@aws-sdk/client-rekognition";
import { useMutation } from "@tanstack/react-query";
import { clsx } from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import css from "./page.module.scss";
import { serverLog } from "@/libraries/logger/server";

const START_PAGE = 0;
const LAST_PAGE = 3;

export default function Client() {
  const router = useRouter();
  const { page, nextPage, prevPage, resetPage } = useSinglePage({
    start: START_PAGE,
    max: LAST_PAGE,
  });

  const [info, setInfo] = useState<TCompareInfo>({
    collectionId: "",
  });

  const [result, setResult] = useState<any>({});

  const mutation = useMutation({
    mutationFn: async (arg: { image: Blob }) => {
      const formData = new FormData();
      formData.append("image", arg.image, "capture.png");
      const res = await fetch(`/api/aws/collections/${info.collectionId}/faces/search_by_image`, {
        method: "POST",
        body: formData,
      });
      const json: { message: string; data: SearchFacesCommandOutput } = await res.json();
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

  const updateInfo = (state: TCompareInfo) => {
    setInfo(() => ({ ...state }));
    nextPage();
  };

  const onSuccessDetector = (image: Blob) => {
    console.log("liveness image 생성");
    mutation.mutate({ image });
  };

  const onErrorDetector = (error: LivenessError) => {
    console.error(error);
    serverLog(error);
  };

  const onUserCancelDetector = () => {
    console.log("user cancel");
    serverLog("user cancel");
    resetPage();
  };

  return (
    <>
      <BackHeader title="얼굴 인증" onClickBack={onClickBack} />
      <div className={clsx(css.wrap)}>
        {page === 0 && <CompareForm info={info} updateInfo={updateInfo} />}
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
