"use client";
import BackHeader from "@/components/common/header/BackHeader";
import ErrorModal from "@/components/common/modal/ErrorModal";
import { useLiveness } from "@/hooks/useLiveness";
import { RECOGNITION_REGION } from "@/libraries/aws/config";
import { useSetModalStore } from "@/stores/modal";
import { FaceLivenessDetectorCore } from "@aws-amplify/ui-react-liveness";
import { Loader } from "@mantine/core";
import { useRouter } from "next/navigation";
import css from "./page.module.scss";

export default function Client() {
  const router = useRouter();
  const modalStore = useSetModalStore();
  const { query, mutation, credentialProvider } = useLiveness();

  const onClickBack = () => {
    router.back();
  };

  const onAnalysisComplete = async () => {
    if (mutation.isPending) return;
    if (!query.data) {
      modalStore.push(ErrorModal, {
        id: "live-session-error",
        props: { error: new Error("세션이 연결되지 않았습니다.") },
      });
      return;
    }
    const result = await mutation.mutateAsync(query.data.sessionId);
    console.log("liveness result", result);
  };

  return (
    <>
      <BackHeader title="Registration" onClickBack={onClickBack} />
      <div className={css.wrap}>
        {query.isPending ? (
          <div className={css.loaderBox}>
            <Loader />
          </div>
        ) : (
          <FaceLivenessDetectorCore
            // displayText={{ hintCenterFaceText: "얼굴을 중앙에" }}
            sessionId={query.data!.sessionId}
            region={RECOGNITION_REGION}
            onAnalysisComplete={onAnalysisComplete}
            config={{ credentialProvider }}
            onError={(error) => {
              console.error(error);
            }}
          />
        )}
      </div>
    </>
  );
}
