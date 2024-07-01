import { modalDefaultBtn } from "@/app/_component/modal/modalBtn.css";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { RowData } from "../_const/row";
import callTms from "@/model/callTms";
import { Session } from "next-auth";
import { TBW_000100_P03 } from "@/type/api";

interface DenyBtnProps {
  session: Session;
  data: RowData;
  onSuccess: (value: any) => void;
}

export default function DenyBtn({ session, data, onSuccess }: DenyBtnProps) {
  const muation = useMutation({
    mutationKey: ["TBW_000100_P03"],
    mutationFn: async () => {
      const TBW_000100_P03Res = await callTms<TBW_000100_P03>({
        svcId: "TBW_000100_P03",
        session,
        data: [
          session.user.corpCd,
          data["회사 코드"], //신청 회사 코드
          data.일자, //신청 입출고 일자
          data.일련번호, //신청 입출고 일련번호
        ],
      });

      const TBW_000100_P03Data = TBW_000100_P03Res.svcRspnData;

      if (!TBW_000100_P03Data) {
        throw new Error("TBW_000100_P03Data is null");
      }

      return TBW_000100_P03Data[0].F01;
    },
    onSuccess: () => {
      toast.success("거절 되었습니다.");
      onSuccess("deny");
    },
  });

  return (
    <button
      className={modalDefaultBtn}
      type="button"
      onClick={() => muation.mutate()}
      disabled={muation.isPending}
    >
      승인
    </button>
  );
}
