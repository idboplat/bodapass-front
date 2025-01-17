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
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useState } from "react";
import css from "./page.module.scss";

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
      formData.append("image", arg.image);
      const res = await fetch(`/api/aws/collections/${info.collectionId}/faces/search_by_image`, {
        method: "POST",
        body: formData,
      });
      const json: { message: string; data: SearchFacesCommandOutput } = await res.json();
      return json;
    },
    onSuccess: (data) => {
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
  };

  const onUserCancelDetector = () => {
    console.log("user cancel");
    resetPage();
  };

  return (
    <>
      <BackHeader title="Registration" onClickBack={onClickBack} />
      <div className={classNames(css.wrap, "scroll")}>
        {page === 0 && <CompareForm info={info} updateInfo={updateInfo} />}
        {page === 1 && (
          <LivenessDetector
            onSuccess={onSuccessDetector}
            onError={onErrorDetector}
            onUserCancel={onUserCancelDetector}
          />
        )}
        {page === 3 && <RegistResult result={result} />}
      </div>
    </>
  );
}
