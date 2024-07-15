import { modalDefaultBtn } from "@/app/_component/modal/modalBtn.css";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { RowData } from "../_const/row.type";
import { Session } from "next-auth";
import callTms from "@/model/callTms";

interface ApproveBtnProps {
  session: Session;
  data: RowData;
  onSuccess: (value: any) => void;
}

export default function ApproveBtn({ session, data, onSuccess }: ApproveBtnProps) {
  const muation = useMutation({
    mutationKey: ["TBW_000100_P04"],
    mutationFn: async () => {
      const TBW_000100_P04Res = await callTms({
        svcId: "TBW_000100_P04",
        session,
        data: [
          session.user.corpCd, //회사 코드
          data["회사 코드"], //신청 회사 코드
          data.일자.replaceAll("-", ""), //신청 입출고 일자
          data.일련번호, //신청 입출고 일련번호
        ],
      });
      return TBW_000100_P04Res.svcRspnData;
    },
    onSuccess: () => {
      toast.success("승인 되었습니다.");
      onSuccess("approve");
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
