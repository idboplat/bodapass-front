import module from "@/app/_component/modal/Modal.module.scss";
import callTms from "@/model/callTms";
import { TBW_000100_P03 } from "@/type/api";
import { useMutation } from "@tanstack/react-query";
import { Session } from "next-auth";
import { toast } from "sonner";
import { RowData } from "../_const/row.type";
import classNames from "classnames";

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
          data["입출고 일자"].replaceAll("-", ""), //신청 입출고 일자
          data["입출고 일련번호"], //신청 입출고 일련번호
        ],
      });

      const TBW_000100_P03Data = TBW_000100_P03Res.svcRspnData;

      if (!TBW_000100_P03Data) {
        throw new Error("TBW_000100_P03Data is null");
      }

      return TBW_000100_P03Data[0].F01;
    },
    onSuccess: () => {
      toast.success("반려 되었습니다.");
      onSuccess("deny");
    },
  });

  const onClick = () => {
    if (muation.isPending) return;
    muation.mutate();
  };

  return (
    <button
      className={classNames(module.btn, "deny")}
      type="button"
      onClick={onClick}
      disabled={muation.isPending}
    >
      반려
    </button>
  );
}
