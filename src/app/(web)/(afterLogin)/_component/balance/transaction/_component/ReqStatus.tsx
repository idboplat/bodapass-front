import { useSetModalStore } from "@/app/_lib/modalStore";
import classNames from "classnames";
import { Session } from "next-auth";
import { RowData } from "../_const/row";
import ApproveModal from "./ApproveModal";
import CancelModal from "./CancelModal";
import { req } from "./reqStatus.css";
import { useTransactionStore } from "../_lib/store";
import { useQueryClient } from "@tanstack/react-query";

interface ReqStatusProps {
  session: Session;
  data: RowData;
  index: number;
  svcId: string;
}

const STATUS_TEXT: Record<string, string> = {
  REQ: "접수",
  APL: "완료",
  REJ: "거절",
  CAN: "취소",
};

export default function ReqStatus({ svcId, index, data, session }: ReqStatusProps) {
  const transactionStore = useTransactionStore();
  const actions = useSetModalStore();
  const queryClient = useQueryClient();

  const onClick = async () => {
    let result: undefined | "deny" | "approve" | "cancel" = undefined;

    if (session.user.corpCd === data["회사 코드"]) {
      // G4는 승인, 거절 불가
      if (session.user.corpGrpTp === "G4") return;
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
      // TODO
      // 승인 or 거절 or 취소 시 단건 재조회후 상태 변경
      queryClient.setQueryData<RowData[]>([svcId, transactionStore], (prev) => {
        if (!prev) return prev;
        const arr = [...prev];
        console.log("table Data arr", arr);
        arr[index];
        return arr;
      });
    }
  };

  if (data["상태 구분"] !== "REQ") {
    return <span>{STATUS_TEXT[data["상태 구분"]]}</span>;
  }

  return (
    <button
      className={classNames(req)}
      onClick={onClick}
      disabled={session.user.corpGrpTp === "G4"}
    >
      {STATUS_TEXT[data["상태 구분"]]}
    </button>
  );
}
