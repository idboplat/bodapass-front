import css from "@/components/common/modal/Modal.module.scss";
import { RowData } from "@/constants/b2c/row.type";
import callTms from "@/libraries/callTms";
import { TBW_000200_P04 } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { Session } from "next-auth";
import { toast } from "sonner";

interface ApproveBtnProps {
  session: Session;
  data: RowData;
  onSuccess: (value: any) => void;
}

export default function ApproveBtn({ session, data, onSuccess }: ApproveBtnProps) {
  const muation = useMutation({
    mutationFn: async () => {
      const TBW_000200_P04Res = await callTms<TBW_000200_P04>({
        svcId: "TBW_000200_P04",
        session,
        data: [
          data["회사 코드"], //신청 회사 코드
          data["입출고 일자"].replaceAll("-", ""), //신청 입출고 일자
          data["입출고 일련번호"], //신청 입출고 일련번호
        ],
      });
      return TBW_000200_P04Res.svcRspnData;
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
    <button className={css.btn} type="button" onClick={onClick} disabled={muation.isPending}>
      승인
    </button>
  );
}
