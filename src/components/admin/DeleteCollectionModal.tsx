import Modal from "@/components/common/modal/Modal";
import css from "@/components/common/modal/Modal.module.scss";
import { ModalProps } from "@/stores/modal";
import { DeleteCollectionCommandOutput } from "@aws-sdk/client-rekognition";
import { Button } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";

type Prop = {
  collectionId: string;
};

const ALERT_MODAL_ID = "deleteCollectionModal";

export default function DeleteCollectionModal({
  collectionId,
  onSuccess,
  onClose,
}: ModalProps<Prop>) {
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/aws/collections/${collectionId}`, {
        method: "DELETE",
      });

      const json: { message: string; data: DeleteCollectionCommandOutput } = await response.json();

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
    mutation.mutate();
  };

  return (
    <Modal id={ALERT_MODAL_ID} title={"콜렉션 삭제"} onClose={onClose} closeOnClickOutside={false}>
      <div className={css.content}>
        <p>{collectionId}를 삭제 하시겠습니까?</p>
      </div>
      <div className={css.btnBox}>
        <Button variant="outline" onClick={onClose} disabled={mutation.isPending}>
          닫기
        </Button>
        <Button variant="filled" onClick={onClickConfirm} loading={mutation.isPending}>
          확인
        </Button>
      </div>
    </Modal>
  );
}
