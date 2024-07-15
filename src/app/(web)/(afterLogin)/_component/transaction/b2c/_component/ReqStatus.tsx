import { useSetModalStore } from "@/app/_lib/modalStore";
import classNames from "classnames";
import { Session } from "next-auth";
import { RowData } from "../_const/row.type";
import ApproveModal from "./ApproveModal";
import { req } from "./reqStatus.css";
import { useTransactionClientStore } from "../_lib/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import callTms from "@/model/callTms";
import { TBW_001000_Q01, TBW_002000_Q01 } from "@/type/api";
import ErrorModal from "@/app/_component/modal/ErrorModal";

interface ReqStatusProps {
  session: Session;
  data: RowData;
  index: number;
}

const STATUS_TEXT: Record<string, string> = {
  REQ: "신청",
  APL: "완료",
  REJ: "거부",
  CAN: "취소",
};

export default function ReqStatus({ index, data, session }: ReqStatusProps) {
  const transactionStore = useTransactionClientStore();
  const actions = useSetModalStore();
  const queryClient = useQueryClient();
  const modalStore = useSetModalStore();

  const mutationGetRow = useMutation({
    mutationKey: ["TBW_002000_Q01"],
    mutationFn: async () => {
      // 단건 조회 API 호출
      const TBW_002000_Q01Res = await callTms<TBW_002000_Q01>({
        session,
        svcId: "TBW_002000_Q01",
        data: [data["회사 코드"], data.일자.replaceAll("-", ""), data.일련번호],
        pgSize: 1,
      });

      const TBW_002000_Q01Data = TBW_002000_Q01Res.svcRspnData;
      if (!TBW_002000_Q01Data) throw new Error(`TBW_002000_Q01Data is null`);
      return TBW_002000_Q01Data[0];
    },
    onSuccess: (data) => {
      // 단건 조회 성공 시 상태 변경
      queryClient.setQueryData<TBW_001000_Q01>(["TBW_002000_Q01", transactionStore], (prev) => {
        if (!prev) return prev;
        const arr = [...prev];
        arr[index] = data;
        return arr;
      });
    },
    onError: async (error) => {
      //재조회 실패 시 페이지 새로고침
      await modalStore.push(ErrorModal, { props: { error } });
      transactionStore.actions.refreshPage();
    },
  });

  const onClick = async () => {
    let result: undefined | "deny" | "approve";

    result = await actions.push(ApproveModal, {
      props: { session, data },
      id: "approveModal",
    });

    if (!!result) {
      mutationGetRow.mutate();
    }
  };

  if (data["상태 구분"] !== "REQ") {
    return <span>{STATUS_TEXT[data["상태 구분"]]}</span>;
  }

  return (
    <button type="button" className={classNames(req)} onClick={onClick}>
      {STATUS_TEXT[data["상태 구분"]]}
    </button>
  );
}
