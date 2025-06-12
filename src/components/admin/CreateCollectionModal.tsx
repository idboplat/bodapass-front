import { ModalProps } from "@/stores/modal";
import { Button, TextInput, RemoveScroll } from "@mantine/core";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { CreateCollectionCommandOutput } from "@aws-sdk/client-rekognition";
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalInner,
  ModalTitle,
} from "../common/modal/Components";

type Prop = {};

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
    <RemoveScroll removeScrollBar={false}>
      <ModalInner style={{ maxWidth: "500px" }} outSideClick={onClose}>
        <ModalHeader>
          <div>
            <ModalTitle>콜렉션 생성</ModalTitle>
          </div>
        </ModalHeader>

        <ModalBody>
          <div>
            <TextInput label="콜렉션 ID" onChange={onChangeCollectionId} />
          </div>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" onClick={onClose} disabled={mutation.isPending}>
            닫기
          </Button>
          <Button variant="filled" onClick={onClickConfirm} loading={mutation.isPending}>
            확인
          </Button>
        </ModalFooter>
      </ModalInner>
    </RemoveScroll>
  );
}
