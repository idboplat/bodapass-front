import ErrorModal from "@/app/_component/modal/ErrorModal";
import { useSetModalStore } from "@/app/_lib/modalStore";
import callTms from "@/model/callTms";
import { TBW_001000_R01, TBW_002000_Q01 } from "@/type/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { Session } from "next-auth";
import { RowData } from "../_const/row.type";
import { useTransactionClientStore } from "../_lib/store";
import ApproveModal from "./ApproveModal";
import { req } from "./reqStatus.css";
import { findEntity, RGST_STAT_ITEM } from "@/app/_const/tp";

interface ReqStatusProps {
  session: Session;
  data: RowData;
  index: number;
}

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
        data: [data["회사 코드"], data["입출고 일자"].replaceAll("-", ""), data["입출고 일련번호"]],
        pgSize: 1,
      });

      const TBW_002000_Q01Data = TBW_002000_Q01Res.svcRspnData;
      if (!TBW_002000_Q01Data) throw new Error("TBW_002000_Q01Data is null");
      return TBW_002000_Q01Data[0];
    },
    onSuccess: (data) => {
      // 단건 조회 성공 시 상태 변경
      queryClient.setQueryData<TBW_001000_R01>(["TBW_001000_R01", transactionStore], (prev) => {
        if (!prev) return prev;
        const arr = [...prev];
        arr[index] = data;
        return arr;
      });

      if (data.F11 === "APL") {
        // 상태가 APL일 경우 잔고 재조회
        queryClient.invalidateQueries({ queryKey: ["TBW_002000_S02"] });
      }
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

  if (data["신청 상태"] !== "승인 대기") {
    return <span>{data["신청 상태"]}</span>;
  }

  return (
    <button type="button" className={classNames(req)} onClick={onClick}>
      {data["신청 상태"]}
    </button>
  );
}
