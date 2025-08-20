import { ModalProps } from "@/types/common";
import { DeleteFacesCommandOutput } from "@aws-sdk/client-rekognition";
import { Button, RemoveScroll } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalInner,
  ModalTitle,
} from "../common/modal/components";

type Prop = {
  faceIds: string[];
  collectionId: string;
};

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
    <RemoveScroll removeScrollBar={false}>
      <ModalInner style={{ maxWidth: "500px" }} outSideClick={onClose}>
        <ModalHeader>
          <div>
            <ModalTitle>얼굴 삭제</ModalTitle>
          </div>
        </ModalHeader>

        <ModalBody>
          <div>
            {faceIds.map((id) => (
              <p key={id}>{id}</p>
            ))}
            <p>삭제하시겠습니까?</p>
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
