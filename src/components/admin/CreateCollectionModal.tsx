import { ModalProps } from "@/stores/modal";
import { Button, TextInput } from "@mantine/core";
import css from "@/components/common/modal/Modal.module.scss";
import Modal from "@/components/common/modal/Modal";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { CreateCollectionCommandOutput } from "@aws-sdk/client-rekognition";

type Prop = {};

const ALERT_MODAL_ID = "createCollectionModal";

export default function CreateCollectionModal({ onSuccess, onClose }: ModalProps<Prop>) {
  const [collectionId, setCollectionId] = useState("");

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/aws/collections/${collectionId}`, {
        method: "POST",
      });

      const json: { message: string; data: CreateCollectionCommandOutput } = await response.json();

      if (!response.ok) {
        throw new Error(json.message);
      }

      return json;
    },
    onSuccess: (data) => {
      onSuccess(data.data);
    },
  });

  const onChangeCollectionId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCollectionId(() => e.target.value);
  };

  const onClickConfirm = () => {
    if (mutation.isPending) return;
    mutation.mutate();
  };

  return (
    <Modal id={ALERT_MODAL_ID} title={"콜렉션 생성"} onClose={onClose} closeOnClickOutside={false}>
      <div className={css.content}>
        <TextInput label="콜렉션 ID" onChange={onChangeCollectionId} />
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
