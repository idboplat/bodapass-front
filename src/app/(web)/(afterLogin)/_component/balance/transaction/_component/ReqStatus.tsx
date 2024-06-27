import { useSetModalStore } from "@/app/_lib/modalStore";
import classNames from "classnames";
import { RowData } from "../_const/colum";
import ApproveModal from "./ApproveModal";
import { req } from "./reqStatus.css";

interface ReqStatusProps {
  data: RowData;
  index: number;
}

const STATUS_TEXT: Record<string, string> = {
  REQ: "접수",
  APL: "완료",
  REJ: "거절",
  CAN: "취소",
};

export default function ReqStatus({ index, data }: ReqStatusProps) {
  const actions = useSetModalStore();

  const onClick = async () => {
    await actions.push(ApproveModal, {
      props: { index, data },
      id: "approveModal", // 모달이 중복해서 열리지 않도록 id를 지정
    });
  };

  if (data["상태 구분"] !== "REQ") {
    return <span>{STATUS_TEXT[data["상태 구분"]]}</span>;
  }

  return (
    <button className={classNames(req)} onClick={onClick}>
      {STATUS_TEXT[data["상태 구분"]]}
    </button>
  );
}
