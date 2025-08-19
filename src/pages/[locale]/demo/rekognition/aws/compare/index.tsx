import BackHeader from "@/components/common/header/BackHeader";
import CompareForm from "@/components/liveness/CompareForm";
import LivenessDetector from "@/components/liveness/LivenessDetector";
import RegistResult from "@/components/liveness/RegistResult";
import { useSinglePage } from "@/hooks/useSinglePage";
import { LivenessError } from "@/libraries/error";
import { TCompareInfo } from "@/types/common";
import {
  CompareFacesCommandOutput,
  SearchFacesByImageCommandOutput,
} from "@aws-sdk/client-rekognition";
import { useMutation } from "@tanstack/react-query";
import { clsx } from "clsx";
import { useRouter } from "next/router";
import { useState } from "react";
import css from "./index.module.scss";
import ky from "ky";
import Image from "next/image";
import { COMPARE_IMAGE_URL, GROUP_ID } from "@/constants";
import { logger } from "@/apis/logger";

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

      const json = await ky
        .post<{
          message: string;
          data: SearchFacesByImageCommandOutput;
        }>(`/api/aws/collections/${GROUP_ID}/faces/search_by_image`, {
          body: formData,
        })
        .json();

      // const json = await ky
      //   .post<{
      //     message: string;
      //     data: CompareFacesCommandOutput;
      //   }>(`/api/aws`, {
      //     body: formData,
      //   })
      //   .json();

      return json.data;
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
    logger(error.error.message);
  };

  const onUserCancelDetector = () => {
    console.log("user cancel");
    logger("user cancel");
    resetPage();
  };

  return (
    <div className={"mobileLayout"}>
      <BackHeader title="얼굴 인증" onClickBack={onClickBack} />
      <div className={clsx(css.wrap)}>
        {/* {page === 0 && (
          <>
            <CompareForm info={info} updateInfo={updateInfo} />
            <Image src={COMPARE_IMAGE_URL} alt="compare" width={320} height={240} unoptimized />
          </>
        )} */}
        {page === 0 && (
          <LivenessDetector
            onSuccess={onSuccessDetector}
            onError={onErrorDetector}
            onUserCancel={onUserCancelDetector}
          />
        )}
        {page === 1 && <RegistResult result={result} />}
      </div>
    </div>
  );
}
