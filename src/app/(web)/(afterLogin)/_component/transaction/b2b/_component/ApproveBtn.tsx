import module from "@/app/_component/modal/Modal.module.scss";
import callTms from "@/model/callTms";
import { useMutation } from "@tanstack/react-query";
import { Session } from "next-auth";
import { toast } from "sonner";
import { RowData } from "../_const/row.type";

interface ApproveBtnProps {
  session: Session;
  data: RowData;
  onSuccess: (value: any) => void;
}

export default function ApproveBtn({ session, data, onSuccess }: ApproveBtnProps) {
  const muation = useMutation({
    mutationFn: async () => {
      const TBW_000100_P04Res = await callTms({
        svcId: "TBW_000100_P04",
        session,
        data: [
          session.user.corpCd, //회사 코드
          data["회사 코드"], //신청 회사 코드
          data["입출고 일자"].replaceAll("-", ""), //신청 입출고 일자
          data["입출고 일련번호"], //신청 입출고 일련번호
        ],
      });
      return TBW_000100_P04Res.svcRspnData;
    },
    onSuccess: () => {
      toast.success("승인 되었습니다.");
      onSuccess("approve");
    },
  });

  const onClick = () => {
    if (muation.isPending) return;
    muation.mutate();
  };

  return (
    <button className={module.btn} type="button" onClick={onClick} disabled={muation.isPending}>
      승인
    </button>
  );
}
