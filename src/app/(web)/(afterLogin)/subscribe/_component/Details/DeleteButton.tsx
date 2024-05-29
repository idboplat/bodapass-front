import ConfirmModal from "@/app/_component/ConfirmModal";
import ErrorModal from "@/app/_component/ErrorModal";
import useModalStore from "@/hook/useModalStore";
import callTms from "@/model/callTms";
import { B9011BData } from "@/type/api";
import { useMutation } from "@tanstack/react-query";
import { useAtom, useSetAtom } from "jotai";
import { useResetAtom } from "jotai/utils";
import { Session } from "next-auth";
import { IoIosCloseCircle } from "react-icons/io";
import { subscribeChartTypeAtom, subscribeDetailsAtom } from "../../_lib/atom";

interface DeleteButtonProps {
  session: Session;
  rowIndex: number | null;
}

export default function DeleteButton({ rowIndex, session }: DeleteButtonProps) {
  const [chartType] = useAtom(subscribeChartTypeAtom);
  const setSubscribeDetails = useSetAtom(subscribeDetailsAtom);
  const resetChartType = useResetAtom(subscribeChartTypeAtom);

  const modalStore = useModalStore();

  const mutate = useMutation({
    mutationKey: ["B9011B"],
    mutationFn: async () => {
      const B9011BRes = await callTms<B9011BData>({
        session,
        svcId: "B9011B",
        data: [
          session.user.sessionId,
          session.user.sessionKey,
          chartType.userId,
          chartType.subscrSn,
        ],
      });

      const B9011BData = B9011BRes.svcRspnData;
      if (!B9011BData) throw new Error("B9011BData is null");
      return B9011BData[0].F01;
    },
    onSuccess: () => {
      setSubscribeDetails((pre) => ({ ...pre, nonce: pre.nonce + 1 }));
      resetChartType();
    },
    onError: (error) => modalStore.push(ErrorModal, { props: { error } }),
  });

  const handleDelete = async () => {
    const content = `${chartType.userId}의 ${chartType.subscrSn} 를 삭제하시겠습니까?`;
    const isDelete = await modalStore.push(ConfirmModal, { props: { content } });
    if (isDelete) mutate.mutate();
  };

  if (rowIndex === null || rowIndex !== chartType.rowIndex) {
    // 선택되지 않으면 버튼을 안보이게
    return null;
  }

  return (
    <button onClick={handleDelete}>
      <IoIosCloseCircle size={20} color="#666666" />
    </button>
  );
}
