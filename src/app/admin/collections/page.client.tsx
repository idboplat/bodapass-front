"use client";

import CreateCollectionModal from "@/components/admin/CreateCollectionModal";
import CustomAgGrid from "@/components/common/agGrid/CustomAgGrid";
import { useSetModalStore } from "@/stores/modal";
import { ListCollectionsCommandOutput } from "@aws-sdk/client-rekognition";
import { Button } from "@mantine/core";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import Link from "next/link";
import { useMemo } from "react";

type Props = {
  data: ListCollectionsCommandOutput;
};

export default function Client({ data }: Props) {
  const modalStore = useSetModalStore();

  const colDefs = useMemo<ColDef[]>(
    () => [
      {
        field: "collectionId",
        width: 150,
      },
      {
        field: "link",
        width: 150,
        cellRenderer: ({
          node,
        }: ICellRendererParams<{ collectionId: string; link: string }, undefined, undefined>) => {
          if (!node.data) return null;
          return <Link href={node.data.link}>자세히</Link>;
        },
      },
    ],
    [],
  );

  const openCreateModal = async () => {
    const result = await modalStore.push(CreateCollectionModal, {
      id: "createCollectionModal",
    });

    console.log("result", result);
  };

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
