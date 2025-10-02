import { TCompareInfo, TRegistInfo } from "@/types/common";
import { Button, TextInput } from "@mantine/core";
import { useState } from "react";
import css from "./Liveness.module.scss";

type Props = {
  info: TCompareInfo;
  updateInfo: (state: TCompareInfo) => void;
};

export default function CompareForm({ info, updateInfo }: Props) {
  const [collectionId, setCollectionId] = useState(info.collectionId);

  const onChangeCollectionId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCollectionId(() => e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateInfo({ collectionId });
  };

  return (
    <form onSubmit={onSubmit} className={css.registForm}>
      <TextInput label="콜렉션 ID" value={collectionId} onChange={onChangeCollectionId} />

      <div className={css.buttonBox}>
        <Button variant="outline" type="submit">
          다음
        </Button>
      </div>
    </form>
  );
}
