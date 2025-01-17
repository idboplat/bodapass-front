import Modal from "@/components/common/modal/Modal";
import css from "@/components/common/modal/Modal.module.scss";
import { ModalProps } from "@/stores/modal";
import { DeleteFacesCommandOutput } from "@aws-sdk/client-rekognition";
import { Button } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";

type Prop = {
  faceIds: string[];
  collectionId: string;
};

const ALERT_MODAL_ID = "deleteFaceModal";

export default function DeleteFaceModal({
  onSuccess,
  onClose,
  collectionId,
  faceIds,
}: ModalProps<Prop>) {
  const mutation = useMutation({
    mutationFn: async (arg: { faceIds: string[] }) => {
      const response = await fetch(`/api/aws/collections/${collectionId}/faces`, {
        method: "DELETE",
        body: JSON.stringify({ faceIds: arg.faceIds }),
      });

      const json: { message: string; data: DeleteFacesCommandOutput } = await response.json();

      if (!response.ok) {
        throw new Error(json.message);
      }

      return json;
    },
    onSuccess: (data) => {
      onSuccess(data.data);
    },
  });

  const onClickConfirm = () => {
    if (mutation.isPending) return;
    mutation.mutate({ faceIds });
  };

  return (
    <Modal id={ALERT_MODAL_ID} title={"콜렉션 생성"} onClose={onClose} closeOnClickOutside={false}>
      <div className={css.content}>
        {faceIds.map((id) => (
          <p key={id}>{id}</p>
        ))}
        <p>삭제하시겠습니까?</p>
      </div>
      <div className={css.btnBox}>
        <Button variant="filled" onClick={onClose} loading={mutation.isPending}>
          닫기
        </Button>
        <Button variant="filled" onClick={onClickConfirm} loading={mutation.isPending}>
          확인
        </Button>
      </div>
    </Modal>
  );
}
