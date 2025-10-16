import { Button, LoadingOverlay } from "@mantine/core";
import css from "./leader-conclude.module.scss";
import { sendMessageToDevice } from "@/hooks/use-device-api";
import { SignatureCanvas } from "./signature-canvas";
import { useSignature } from "@/hooks/use-signature";
import { useTCM200201SSP01 } from "@/hooks/tms/use-contract";
import { DEVICE_API } from "@/types/common";

interface Props {
  session: Session;
  mastCorpCd: string;
  corpCd: string;
  userId: string;
}

export default function CrewConclude({ session, mastCorpCd, corpCd, userId }: Props) {
  const { canvasRef, hasSignature, clearSignature, saveSignature, eventHandlers } = useSignature({
    width: 200,
    height: 100,
    onSignatureChange: (data) => {
      // 서명 데이터가 변경될 때 필요한 로직
      console.log("서명 데이터 변경:", data ? "서명됨" : "지워짐");
    },
  });

  const mutation = useTCM200201SSP01();

  const onClick = (type: "REJ" | "APL") => () => {
    if (mutation.isPending) return;

    mutation.mutate(
      { mastCorpCd, corpCd, userId, type, session },
      {
        onSuccess: (data) => {
          if (!!window.ReactNativeWebView) {
            sendMessageToDevice({
              type: DEVICE_API.crewContractEnd,
              payload: null,
            });
          }
        },
      },
    );
  };

  return (
    <>
      <div>
        <div>팀원 계약</div>
        <div>회사 {mastCorpCd}</div>
        <div>현장 {corpCd}</div>

        <div>TODO: 단건조회후 내용 표시</div>

        <div>수령인 {userId}</div>

        {/* <SignatureCanvas {...eventHandlers} canvasRef={canvasRef} width={200} height={150} /> */}

        {/* {hasSignature && (
          <div className={css.signatureButtons}>
            <Button onClick={clearSignature} variant="outline" color="red">
              지우기
            </Button>
            <Button onClick={saveSignature} color="green">
              저장
            </Button>
          </div>
        )} */}

        <div className={css.buttonBox}>
          <Button onClick={onClick("REJ")} loading={mutation.isPending}>
            반려
          </Button>
          <Button onClick={onClick("APL")} loading={mutation.isPending}>
            승인
          </Button>
        </div>

        <LoadingOverlay visible={mutation.isPending} />
      </div>
    </>
  );
}
