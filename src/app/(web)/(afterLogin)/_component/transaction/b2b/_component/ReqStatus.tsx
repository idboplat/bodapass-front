import { useSetModalStore } from "@/app/_lib/modalStore";
import classNames from "classnames";
import { Session } from "next-auth";
import { RowData } from "../_const/row.type";
import ApproveModal from "./ApproveModal";
import CancelModal from "./CancelModal";
import { req } from "./reqStatus.css";
import { useTransactionCorpStore } from "../_lib/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import callTms from "@/model/callTms";
import { TBW_001000_Q01, TBW_002000_Q01 } from "@/type/api";
import ErrorModal from "@/app/_component/modal/ErrorModal";
import { findEntity, RGST_STAT_ITEM } from "@/app/_const/tp";

interface ReqStatusProps {
  session: Session;
  data: RowData;
  index: number;
}

export default function ReqStatus({ index, data, session }: ReqStatusProps) {
  const transactionStore = useTransactionCorpStore();
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
      if (!TBW_002000_Q01Data) throw new Error("TBW_002000_Q01Data is null");
      return TBW_002000_Q01Data[0];
    },
    onSuccess: (data) => {
      // 단건 조회 성공 시 상태 변경
      queryClient.setQueryData<TBW_001000_Q01>(["TBW_001000_Q01", transactionStore], (prev) => {
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
    let result: undefined | "deny" | "approve" | "cancel";

    if (session.user.corpCd !== data["회사 코드"]) {
      // G4는 승인, 거절 불가
      result = await actions.push(ApproveModal, {
        props: { session, data },
        id: "approveModal",
      });
    } else {
      result = await actions.push(CancelModal, {
        props: { session, data },
        id: "cancelModal",
      });
    }

    if (!!result) {
      mutationGetRow.mutate();
    }
  };

  const status = findEntity(RGST_STAT_ITEM, data["상태 구분"])?.[1];

  if (data["상태 구분"] !== "REQ") {
    return <span>{status}</span>;
  }

  return (
    <button type="button" className={classNames(req)} onClick={onClick}>
      {status}
    </button>
  );
}
