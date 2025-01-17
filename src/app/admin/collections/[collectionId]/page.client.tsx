"use client";
import DeleteFaceModal from "@/components/admin/DeleteFaceModal";
import CustomAgGrid from "@/components/common/agGrid/CustomAgGrid";
import { useSetModalStore } from "@/stores/modal";
import { ListFacesCommandOutput } from "@aws-sdk/client-rekognition";
import { Button, Checkbox } from "@mantine/core";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

type Props = {
  data: ListFacesCommandOutput;
};

type Rows = {
  faceId: string;
  userId: string;
  imageId: string;
  externalImageId: string;
  s3Key: string;
  s3ImagePreviewByCloudFront: string;
};

export default function Client({ data }: Props) {
  const router = useRouter();
  const modalStore = useSetModalStore();
  const collectionId = useParams<{ collectionId: string }>().collectionId;

  const [deleteList, setDeleteList] = useState<string[]>([]);

  const addList = (id: string) => setDeleteList([...deleteList, id]);
  const removeList = (id: string) => setDeleteList(deleteList.filter((v) => v !== id));

  const colDefs = useMemo<ColDef[]>(
    () => [
      {
        field: "faceId",
        width: 300,
      },
      {
        field: "userId",
        width: 150,
      },
      {
        field: "imageId",
        width: 300,
      },
      {
        field: "externalImageId",
        width: 200,
      },
      {
        field: "delete",
        width: 150,
        cellRenderer: ({ data }: ICellRendererParams<Rows>) => {
          if (!data) return null;
          const include = deleteList.includes(data.faceId);
          const toggleList = () => {
            if (include) {
              removeList(data.faceId);
            } else {
              addList(data.faceId);
            }
          };

          return <Checkbox checked={include} onChange={toggleList} />;
        },
      },
      { field: "s3Key", width: 150 },
      {
        field: "s3ImagePreviewByCloudFront",
        width: 200,
        autoHeight: true,
        cellRenderer: ({ data }: ICellRendererParams<Rows>) => (
          <img src={data?.s3ImagePreviewByCloudFront} width={200} style={{ aspectRatio: "12/9" }} />
        ),
      },
    ],
    [deleteList],
  );

  const openDeleteModal = useCallback(
    async (faceIds: string[]) => {
      const result = await modalStore.push(DeleteFaceModal, {
        id: "deleteFaceModal",
        props: { faceIds, collectionId },
      });
      router.refresh();

      console.log("result", result);
    },
    [modalStore, collectionId],
  );

  const rowData = useMemo(
    () =>
      data.Faces?.map<Rows>((face) => ({
        faceId: face.FaceId || "",
        userId: face.UserId || "",
        imageId: face.ImageId || "",
        externalImageId: face.ExternalImageId || "",
        s3Key: face.ExternalImageId + ".png",
        s3ImagePreviewByCloudFront: "/cloudfront/" + face.ExternalImageId + ".png",
      })) || [],
    [data],
  );

  return (
    <div>
      <h2>콜렉션 {collectionId} 상세</h2>
      <Button onClick={() => openDeleteModal(deleteList)}>선택 삭제</Button>
      <CustomAgGrid colDefs={colDefs} data={rowData} />
    </div>
  );
}
