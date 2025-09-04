import ScreenError from "@/components/common/screen-error";
import ScreenLoading from "@/components/common/screen-loading";
import ErrorModal from "@/components/common/modal/error-modal";
import { useLiveness } from "@/hooks/use-liveness";
import { RECOGNITION_REGION } from "@/libraries/aws/config";
import { LivenessError } from "@/libraries/error";
import { FaceLivenessDetectorCore } from "@aws-amplify/ui-react-liveness";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { nativeAlert } from "@/hooks/use-device-api";

// https://ui.docs.amplify.aws/react/connected-components/liveness/customization/

interface Props {
  onSuccess: (image: Blob) => void;
  onError: (error: LivenessError) => void;
  onUserCancel: () => void;
}

function Success({ onSuccess, onError, onUserCancel }: Props) {
  const { query, mutation, credentialProvider } = useLiveness();

  const onAnalysisComplete = async () => {
    if (mutation.isPending) return;

    if (!query.data) {
      nativeAlert("세션이 연결되지 않았습니다.");
      return;
    }

    mutation.mutate(query.data.sessionId, { onSuccess });
  };

  return (
    <FaceLivenessDetectorCore
      // displayText={{ hintCenterFaceText: "얼굴을 중앙에" }}
      sessionId={query.data!.sessionId}
      region={RECOGNITION_REGION}
      onAnalysisComplete={onAnalysisComplete}
      config={{ credentialProvider }}
      onError={onError}
      onUserCancel={onUserCancel} // 사용자가 취소했을 때
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
