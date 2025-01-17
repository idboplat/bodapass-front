"use client";

import CreateCollectionModal from "@/components/admin/CreateCollectionModal";
import CustomAgGrid from "@/components/common/agGrid/CustomAgGrid";
import { useSetModalStore } from "@/stores/modal";
import { Button } from "@mantine/core";
import { ColDef } from "ag-grid-community";
import { useMemo } from "react";

type Props = {
  data: { collectionId: string }[];
};

export default function Client({ data }: Props) {
  const modalStore = useSetModalStore();
  const colDefs = useMemo<ColDef[]>(
    () => [
      {
        field: "collectionId",
        width: 150,
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

  return (
    <div>
      <h2>콜렉션 홈 메인</h2>
      <div>
        <Button onClick={openCreateModal}>콜렉션 생성</Button>
      </div>
      <CustomAgGrid colDefs={colDefs} data={data} />
    </div>
  );
}
