import { useSetModalStore } from "@/app/_lib/modalStore";
import classNames from "classnames";
import { Session } from "next-auth";
import { RowData } from "../_const/row";
import ApproveModal from "./ApproveModal";
import CancelModal from "./CancelModal";
import { req } from "./reqStatus.css";
import { useTransactionStore } from "../_lib/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import callTms from "@/model/callTms";
import { TBW_001000_Q01, TBW_001000_R01, TBW_002000_Q01 } from "@/type/api";
import ErrorModal from "@/app/_component/modal/ErrorModal";

interface ReqStatusProps {
  session: Session;
  data: RowData;
  index: number;
  svcId: string;
}

const STATUS_TEXT: Record<string, string> = {
  REQ: "신청",
  APL: "완료",
  REJ: "거부",
  CAN: "취소",
};

export default function ReqStatus({ svcId, index, data, session }: ReqStatusProps) {
  const transactionStore = useTransactionStore();
  const actions = useSetModalStore();
  const queryClient = useQueryClient();
  const modalStore = useSetModalStore();

  const mutationGetRow = useMutation({
    mutationKey: ["getTableRowData"],
    mutationFn: async () => {
      // 단건 조회 API 호출
      const res = await callTms<TBW_002000_Q01>({
        session,
        svcId: "TBW_002000_Q01",
        data: [data["회사 코드"], data.일자.replaceAll("-", ""), data.일련번호],
        pgSize: 1,
      });

      const rspnData = res.svcRspnData;
      if (!rspnData) throw new Error(`${svcId} is null`);
      return rspnData[0];
    },
    onSuccess: (data) => {
      // 단건 조회 성공 시 상태 변경
      queryClient.setQueryData<TBW_001000_Q01 | TBW_001000_R01>(
        [svcId, transactionStore],
        (prev) => {
          if (!prev) return prev;
          const arr = [...prev];
          arr[index] = data;
          return arr;
        },
      );
    },
    onError: async (error) => {
      //재조회 실패 시 페이지 새로고침
      await modalStore.push(ErrorModal, { props: { error } });
      transactionStore.actions.refreshPage();
    },
  });

  const onClick = async () => {
    let result: undefined | "deny" | "approve" | "cancel" = undefined;

    if (session.user.corpCd !== data["회사 코드"]) {
      // G4는 승인, 거절 불가
      // if (session.user.corpGrpTp === "G4") return;
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

  if (data["상태 구분"] !== "REQ") {
    return <span>{STATUS_TEXT[data["상태 구분"]]}</span>;
  }

  // G4는 승인, 거절 불가
  // const G4Granted = session.user.corpCd !== data["회사 코드"] && session.user.corpGrpTp === "G4";

  return (
    <button type="button" className={classNames(req)} onClick={onClick}>
      {STATUS_TEXT[data["상태 구분"]]}
    </button>
  );
}
