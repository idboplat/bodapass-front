"use client";
import React, { useState } from "react";
import { Loader } from "@mantine/core";
import { FaceLivenessDetector } from "@aws-amplify/ui-react-liveness";
import BackHeader from "@/components/common/header/BackHeader";
import { useRouter } from "next/navigation";
import css from "./page.module.scss";
import { useQuery } from "@tanstack/react-query";

export default function Client() {
  const router = useRouter();

  const { isPending } = useQuery({
    queryKey: ["createLivenessSession"],
    queryFn: async () => {},
  });

  const onClickBack = () => {
    router.back();
  };

  return (
    <>
      <BackHeader title="Registration" onClickBack={onClickBack} />
      <div className={css.wrap}>
        {isPending ? (
          <div className={css.loaderBox}>
            <Loader />
          </div>
        ) : (
          <FaceLivenessDetector
            // displayText={{ hintCenterFaceText: "얼굴을 중앙에" }}
            sessionId={""}
            region={process.env.NEXT_PUBLIC_AWS_REGION}
            onAnalysisComplete={async () => {
              console.log("분석 완료");
            }}
            onError={(error) => {
              console.error(error);
            }}
          />
        )}
      </div>
    </>
  );
}
