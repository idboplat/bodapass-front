import Modal from "@/components/common/modal/Modal";
import css from "@/components/common/modal/Modal.module.scss";
import ModalCloseBtn from "@/components/common/modal/ModalCloseBtn";
import { RowData } from "@/constants/b2b/row.type";
import callTms from "@/libraries/callTms";
import { ModalProps } from "@/stores/modal";
import { TBW_000100_P02 } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import classNames from "classnames";
import { Session } from "next-auth";
import { toast } from "sonner";
import ApproveView from "./ApproveView";

const ID = "cancelModal";

interface CancelModalProps {
  session: Session;
  data: RowData;
}

export default function CancelModal({
  session,
  data,
  onClose,
  onSuccess,
}: ModalProps<CancelModalProps>) {
  const mutation = useMutation({
    mutationKey: ["TBW_000100_P02"],
    mutationFn: async () => {
      const TBW_000100_P02Res = await callTms<TBW_000100_P02>({
        svcId: "TBW_000100_P02",
        session,
        data: [
          session.user.corpCd,
          data["회사 코드"], //입출고 회사 코드
          data["입출고 일자"].replaceAll("-", ""), //입출고 일자
          data["입출고 일련번호"], //입출고 일련번호
        ],
      });

      const TBW_000100_P02Data = TBW_000100_P02Res.svcRspnData;

      if (!TBW_000100_P02Data) {
        throw new Error("TBW_000100_P02Data is null");
      }

      return TBW_000100_P02Data[0].F01;
    },
    onSuccess: () => {
      toast.success("신청이 취소되었습니다.");
      onSuccess("cancel");
    },
  });

  return (
    <Modal id={ID} onClose={onClose}>
      <div className={classNames(css.content, "center")}>
        <ModalCloseBtn onClose={onClose} />
        <div>
          <div className={css.header}>
            <h3 className={css.title}>취소요청</h3>
          </div>
          <ApproveView data={data} />
        </div>
        <div className={css.btnBox}>
          <button
            className={classNames(css.btn, "deny")}
            type="button"
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
          >
            취소
          </button>
        </div>
      </div>
    </Modal>
  );
}
