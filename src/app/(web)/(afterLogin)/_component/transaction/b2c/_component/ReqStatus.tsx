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
        data: [data["회사 코드"], data.일자.replaceAll("-", ""), data.일련번호],
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
        // data.F02 회사명 제외
        // arr[index].F05 외부사용자ID 유지
        // arr[index]를 새로운 객체로 대체, 불변성 유지
        arr[index] = {
          F01: data.F01,
          F02: data.F03,
          F03: data.F04,
          F04: data.F05,
          F05: arr[index].F05,
          F06: data.F06,
          F07: data.F07,
          F08: data.F08,
          F09: data.F09,
          F10: data.F10,
          F11: data.F11,
          F12: data.F12,
          F13: data.F13,
          F14: data.F14,
          F15: data.F15,
        };

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
