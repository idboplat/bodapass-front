"use client";
import CreateCollectionModal from "@/components/admin/CreateCollectionModal";
import DeleteCollectionModal from "@/components/admin/DeleteCollectionModal";
import CustomAgGrid from "@/components/common/agGrid/CustomAgGrid";
import { useSetModalStore } from "@/stores/modal";
import { ListCollectionsCommandOutput } from "@aws-sdk/client-rekognition";
import { Button } from "@mantine/core";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

type Rows = {
  collectionId: string;
  link: string;
};

type Props = {
  data: ListCollectionsCommandOutput;
};

export default function Client({ data }: Props) {
  const modalStore = useSetModalStore();
  const router = useRouter();

  const openDeleteModal = async (collectionId: string) => {
    const result = await modalStore.push(DeleteCollectionModal, {
      id: "deleteCollectionModal",
      props: { collectionId },
    });

    console.log("result", result);
    router.refresh();
  };

  const openCreateModal = async () => {
    const result = await modalStore.push(CreateCollectionModal, {
      id: "createCollectionModal",
    });

    console.log("result", result);
    router.refresh();
  };

  const colDefs = useMemo<ColDef[]>(
    () => [
      {
        field: "collectionId",
        width: 150,
      },
      {
        field: "link",
        width: 150,
        cellRenderer: ({ node }: ICellRendererParams<Rows, undefined, undefined>) => {
          if (!node.data) return null;
          return <Link href={node.data.link}>자세히</Link>;
        },
      },
      {
        field: "delete",
        width: 150,
        cellRenderer: ({ node }: ICellRendererParams<Rows, undefined, undefined>) => {
          if (!node.data) return null;
          return (
            <Button size="xs" onClick={() => openDeleteModal(node.data!.collectionId)}>
              삭제
            </Button>
          );
        },
      },
    ],
    [],
  );

  const rowData = useMemo(
    () =>
      data.CollectionIds?.map((id) => ({
        collectionId: id,
        link: "/admin/collections/" + id,
      })) || [],
    [data],
  );

  return (
    <div>
      <h2>콜렉션 홈 메인</h2>
      <div>
        <Button onClick={openCreateModal}>콜렉션 생성</Button>
      </div>
      <CustomAgGrid colDefs={colDefs} data={rowData} />
    </div>
  );
}
