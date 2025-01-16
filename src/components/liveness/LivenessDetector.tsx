import { useLiveness } from "@/hooks/useLiveness";
import { RECOGNITION_REGION } from "@/libraries/aws/config";
import { useSetModalStore } from "@/stores/modal";
import { FaceLivenessDetectorCore } from "@aws-amplify/ui-react-liveness";
import ErrorModal from "@/components/common/modal/ErrorModal";
import { Suspense } from "react";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import ScreenLoading from "../common/loading/ScreenLoading";
import ScreenError from "../common/error/ScreenError";

// https://ui.docs.amplify.aws/react/connected-components/liveness/customization/

interface Props {}

function Success({}: Props) {
  const { query, mutation, credentialProvider } = useLiveness();
  const modalStore = useSetModalStore();

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
    <FaceLivenessDetectorCore
      // displayText={{ hintCenterFaceText: "얼굴을 중앙에" }}
      sessionId={query.data!.sessionId}
      region={RECOGNITION_REGION}
      onAnalysisComplete={onAnalysisComplete}
      config={{ credentialProvider }}
      onError={(error) => {
        console.error(error);
      }}
      // onUserCancel={() => {}} // 사용자가 취소했을 때
      // components={{
      //   PhotosensitiveWarning: () => <div>테스트!!!!!!!</div>,
      // }}
    />
  );
}

export default function LivenessDetector(props: Props) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary FallbackComponent={ScreenError} onError={reset}>
          <Suspense fallback={<ScreenLoading />}>
            <Success {...props} />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
