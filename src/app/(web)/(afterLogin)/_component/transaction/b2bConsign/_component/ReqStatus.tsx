import { useSetModalStore } from "@/app/_lib/modalStore";
import classNames from "classnames";
import { Session } from "next-auth";
import { RowData } from "../_const/row.type";
import ApproveModal from "./ApproveModal";
import CancelModal from "./CancelModal";
import css from "./ReqStatus.module.scss";
import { useTransactionCorpStore } from "../_lib/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import callTms from "@/model/callTms";
import { TBW_001000_Q02, TBW_002000_Q01 } from "@/type/api";
import ErrorModal from "@/app/_component/modal/ErrorModal";

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
        data: [data["회사 코드"], data["입출고 일자"].replaceAll("-", ""), data["입출고 일련번호"]],
        pgSize: 1,
      });

      const TBW_002000_Q01Data = TBW_002000_Q01Res.svcRspnData;
      if (!TBW_002000_Q01Data) throw new Error("TBW_002000_Q01Data is null");
      return TBW_002000_Q01Data[0];
    },
    onSuccess: (data) => {
      // 단건 조회 성공 시 상태 변경
      queryClient.setQueryData<TBW_001000_Q02>(["TBW_001000_Q02", transactionStore], (prev) => {
        if (!prev) return prev;
        const arr = [...prev]; // 불변성 유지
        arr[index] = {
          F01: data.F01, // 생성 작업 일시
          F02: data.F02, // 생성 작업 ID
          F03: data.F03, // 회사 코드
          F04: data.F04, // 회사 명
          F05: data.F05, // 종목 코드
          F06: data.F06, // 입출고 구분
          F07: arr[index].F07, // 입출고 적요 구분
          F08: data.F07, // 입출고 수량
          F09: data.F11, // 입출고 일자
          F10: data.F12, // 입출고 일련번호
          F11: data.F10, // 계좌번호
          F12: data.F08, // 잔고 수량
          F13: data.F09, // 신청 상태 구분
          F14: data.F13, // 변경 작업 일시
          F15: data.F14, // 변경 작업 ID
        };
        return arr;
      });

      if (data.F09 === "APL") {
        // 상태가 APL일 경우 잔고 재조회
        queryClient.invalidateQueries({ queryKey: ["TBW_002000_S02"] });
      }
      // 입금 신청 내역 재조회
      queryClient.invalidateQueries({ queryKey: ["TBW_001000_Q03"] });
    },
    onError: async (error) => {
      //재조회 실패 시 페이지 새로고침
      await modalStore.push(ErrorModal, { props: { error } });
      transactionStore.actions.refreshPage();
      queryClient.invalidateQueries({ queryKey: ["TBW_002000_S02"] }); // 잔고 재조회
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
    <button type="button" className={classNames(css.req)} onClick={onClick}>
      {data["신청 상태"]}
    </button>
  );
}
