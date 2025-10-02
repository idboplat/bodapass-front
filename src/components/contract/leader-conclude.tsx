import { useMutation } from "@tanstack/react-query";
import { callTms } from "@/libraries/call-tms";
import { Button, LoadingOverlay } from "@mantine/core";
import { TContractDto } from "./dto";
import css from "./leader-conclude.module.scss";
import { nativeAlert, sendMessageToDevice } from "@/hooks/use-device-api";

interface Props {
  session: Session;
  dto: Required<TContractDto>;
}

export function Conclude({ session, dto }: Props) {
  const mutation = useMutation({
    mutationFn: async (args: Required<TContractDto> & { type: "REJ" | "APL" }) => {
      const request = await callTms({
        session,
        svcId: "TCM200201SSP01",
        data: [args.mastCorpCd, args.corpCd, args.userId, args.type],
        locale: "ko",
      });

      const data = request.svcRspnData?.[0];
      if (!data) throw new Error("FW999");

      return data;
    },
    onSuccess: (data) => {
      if (!!window.ReactNativeWebView) {
        sendMessageToDevice({
          type: "leaderContractEnd",
          payload: null,
        });
      }
    },
  });

  const onClick = (type: "REJ" | "APL") => () => {
    if (mutation.isPending) return;
    mutation.mutate({ ...dto, type });
  };

  return (
    <>
      <div>
        <div>회사 {dto.mastCorpCd}</div>
        <div>현장 {dto.corpCd}</div>

        <div>TODO: 단건조회후 내용 표시</div>

        <div>수령인 {dto.userId}</div>

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
