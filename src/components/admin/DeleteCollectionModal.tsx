import { ModalProps } from "@/stores/modal";
import { DeleteCollectionCommandOutput } from "@aws-sdk/client-rekognition";
import { Button } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalInner,
  ModalTitle,
} from "../common/modal/Components";
import { RemoveScroll } from "react-remove-scroll";

type Prop = {
  collectionId: string;
};

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
    <RemoveScroll removeScrollBar={false}>
      <ModalInner style={{ maxWidth: "500px" }} outSideClick={onClose}>
        <ModalHeader>
          <div>
            <ModalTitle>콜렉션 삭제</ModalTitle>
          </div>
        </ModalHeader>

        <ModalBody>
          <div>
            <p>{collectionId}를 삭제 하시겠습니까?</p>
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
