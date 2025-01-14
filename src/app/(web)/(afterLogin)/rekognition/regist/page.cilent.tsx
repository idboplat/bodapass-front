"use client";
import React, { useState } from "react";
import { Loader } from "@mantine/core";
import { FaceLivenessDetector } from "@aws-amplify/ui-react-liveness";
import BackHeader from "@/components/common/header/BackHeader";
import { useRouter } from "next/navigation";
import css from "./page.module.scss";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CreateFaceLivenessSessionCommandOutput,
  GetFaceLivenessSessionResultsCommandOutput,
} from "@aws-sdk/client-rekognition";
import { useSetModalStore } from "@/stores/modal";
import ErrorModal from "@/components/common/modal/ErrorModal";
import { RECOGNITION_REGION } from "@/libraries/aws/config";

export default function Client() {
  const router = useRouter();
  const modalStore = useSetModalStore();

  const mutation = useMutation({
    mutationFn: async (sessionId: string) => {
      const res = await fetch("/api/aws/liveness/get_result?" + `sessionId=${sessionId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json: { message: string; data: GetFaceLivenessSessionResultsCommandOutput } =
        await res.json();

      return json.data;
    },
  });

  const { isPending, data } = useQuery({
    queryKey: ["createLivenessSession"],
    queryFn: async () => {
      const res = await fetch("/api/aws/liveness/create_session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json: { message: string; data: CreateFaceLivenessSessionCommandOutput } =
        await res.json();
      console.log("create liveness session", json.data);
      return json.data.SessionId;
    },
  });

  const onClickBack = () => {
    router.back();
  };

  const onAnalysisComplete = async () => {
    if (mutation.isPending) return;
    if (!data) {
      modalStore.push(ErrorModal, {
        id: "live-session-error",
        props: { error: new Error("세션이 연결되지 않았습니다.") },
      });
      return;
    }
    const result = await mutation.mutateAsync(data);
    console.log("liveness result", result);
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
            sessionId={data!}
            region={RECOGNITION_REGION}
            onAnalysisComplete={onAnalysisComplete}
            config={{}}
            onError={(error) => {
              console.error(error);
            }}
          />
        )}
      </div>
    </>
  );
}
